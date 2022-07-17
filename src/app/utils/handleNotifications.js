import twilio from 'twilio'

const accountSid = 'ACdeb96298ae8fed57c751089574d7d779';
const authToken = '3d45633fe821c382a3895aa69d31bdef';
const client = twilio(accountSid, authToken);

client.messages
    .create({
        body: 'Ola, teste twilio 2',
        from: 'whatsapp:+17868477903',
        to: 'whatsapp:+5519989340973'
    })
    .then(message => console.log(message.sid))
    .done();