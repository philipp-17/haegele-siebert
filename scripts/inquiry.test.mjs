import test from 'node:test';
import assert from 'node:assert/strict';
import { handleInquiry } from '../lib/inquiry.ts';
const origin = 'https://website.example';
const valid = { firstName: 'Chris', lastName: 'Test', email: 'kunde@example.com', phone: '01771234567', service: 'Bitte die Hecke schneiden, einmalig in Allmersbach im Oktober.', privacy: true, website: '', submissionId: 'f71420b6-a4a5-4a75-88c9-cf18848d019c' };
const config = { apiKey: 'dummy-unit-test-key', from: 'Website <anfragen@example.com>', recipient: 'Info@haegele-siebert.de' };
const request = (data = valid, headers = {}) => new Request(`${origin}/api/anfrage/`, {method: 'POST', headers: {origin, 'content-type':'application/json', ...headers}, body: JSON.stringify(data)});
const forbiddenSend = async () => { assert.fail('Diese Anfrage darf keine E-Mail auslösen'); };

test('Versand verwendet festen Empfänger, Reply-To und Idempotenzschlüssel', async () => {
  let calls = 0;
  const send = async (url, init) => {
    calls++;
    assert.equal(url, 'https://api.resend.com/emails');
    assert.equal(init.headers.Authorization, `Bearer ${config.apiKey}`);
    assert.equal(init.headers['Idempotency-Key'], `inquiry/${valid.submissionId}`);
    const mail = JSON.parse(init.body);
    assert.deepEqual(mail.to, [config.recipient]);
    assert.equal(mail.from, config.from);
    assert.equal(mail.reply_to, valid.email);
    assert.ok(mail.text.includes(valid.service));
    assert.ok(!mail.text.includes('Nachricht:'));
    assert.equal(mail.html, undefined);
    return Response.json({id:'simulated-message-id'});
  };
  const response = await handleInquiry(request({...valid, to:'attacker@example.com'}), config, send);
  assert.equal(response.status, 200);
  assert.match((await response.json()).message, /Vielen Dank/);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(calls, 1);
});

test('Anfrage ohne Nachrichtenfeld und ohne optionale Telefonnummer wird angenommen', async () => {
  assert.equal((await handleInquiry(request({...valid, phone:''}), config, async () => Response.json({id:'accepted'}))).status, 200);
});

test('Honeypot verwirft Spam ohne Versand oder Zugangsdaten', async () => {
  assert.equal((await handleInquiry(request({website:'spam'}), {recipient:config.recipient}, forbiddenSend)).status, 200);
});

test('Servervalidierung weist ungültige Felder und Header-Injection ab', async () => {
  for (const patch of [{firstName:''}, {lastName:'x'.repeat(61)}, {email:'bad-email'}, {email:'kunde@example.com\r\nBcc:attacker@example.com'}, {phone:'abc'}, {phone:123}, {service:{}}, {service:'x'}, {service:'x'.repeat(1001)}, {service:'Hecke\u0000schneiden'}, {privacy:false}, {submissionId:'invalid'}]) {
    assert.equal((await handleInquiry(request({...valid,...patch}), config, forbiddenSend)).status, 400, JSON.stringify(patch));
  }
});

test('Fremde Herkunft und fehlender Origin werden abgewiesen', async () => {
  assert.equal((await handleInquiry(request(valid,{origin:'https://other.example'}), config, forbiddenSend)).status, 403);
  const req=request(); req.headers.delete('origin');
  assert.equal((await handleInquiry(req, config, forbiddenSend)).status, 403);
});

test('Herkunftsprüfung verwendet den Browser-Host bei internem Next.js-Servernamen', async () => {
  const proxied = (requestOrigin, host = 'website.example') => new Request('https://internal-server.example/api/anfrage/', {
    method: 'POST', headers: { origin: requestOrigin, host, 'content-type': 'application/json' }, body: JSON.stringify(valid),
  });
  assert.equal((await handleInquiry(proxied(origin), config, async () => Response.json({id:'accepted'}))).status, 200);
  assert.equal((await handleInquiry(proxied('https://attacker.example'), config, forbiddenSend)).status, 403);
  assert.equal((await handleInquiry(proxied('http://website.example'), config, forbiddenSend)).status, 403);
  assert.equal((await handleInquiry(proxied(origin, 'invalid host'), config, forbiddenSend)).status, 403);
});

test('Ungültiges JSON, falscher Content-Type und zu große Anfragen werden abgewiesen', async () => {
  assert.equal((await handleInquiry(new Request(`${origin}/api/anfrage/`, {method:'POST',headers:{origin,'content-type':'application/json'},body:'{' }), config, forbiddenSend)).status, 400);
  assert.equal((await handleInquiry(request(valid,{'content-type':'text/plain'}), config, forbiddenSend)).status, 415);
  assert.equal((await handleInquiry(request({...valid,service:'x'.repeat(25000)}), config, forbiddenSend)).status, 400);
});

test('Fehlende Konfiguration wird nicht als Versand bestätigt', async () => {
  assert.equal((await handleInquiry(request(), {recipient:config.recipient}, forbiddenSend)).status, 503);
});

test('Providerfehler und Netzwerkfehler melden keinen Erfolg oder sensible Fehlerdetails', async () => {
  for (const send of [async () => Response.json({message:'private provider detail'},{status:403}), async () => {throw new Error('private provider detail')}, async () => Response.json({}), async () => new Response('not json')]) {
    const response=await handleInquiry(request(),config,send);
    assert.equal(response.status,502);
    assert.doesNotMatch(await response.text(),/private provider detail|Vielen Dank/);
  }
});
