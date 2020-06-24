let mqtt = require('mqtt')
let protobuf = require('protobufjs')

let connectionString = 'CONNECTION_STRING';
let topicName = 'topic';

var client = mqtt.connect(connectionString, { qos: 2, clean: true, clientId: 'conectorTest', username: 'user', password: '123456' })
let eventProto;

protobuf.load("protoName.proto", function (err, root) {
    if (err)
        throw err;

    eventProto = root.lookupType("protoLookup");
});

client.on('connect', function () {
    client.subscribe(topicName, { qos: 2, clean: true })
    console.log('Connected');
})

client.on('message', function (topic, message) {

    message = eventProto.decode(message);
    let message2 = JSON.parse(JSON.stringify(message))
    console.log('******');

    console.log(message2);

})
