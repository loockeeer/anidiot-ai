
const Brain = require("./Brain");
class DiscordBrain {
    constructor(client, dbFilename, datasets, adapters, prefix) {
        this._client = client;
        this._adapters = adapters;
        this._brain = new Brain(dbFilename, datasets);
        this._prefix = prefix;
    }
    setPrefix(prefix) {
        this._prefix = prefix;
        return this;
    }
    get prefix() {
        return this._prefix;
    }
    setAdapters(adapters) {
        this._adapters = adapters;
        return this;
    }
    get adapters() {
        return this._adapters;
    }
    addAdapter(adapter) {
        this._adapters.push(adapter);
        return this;
    }
    build() {
        this._brain.build();
        return this;
    }
    listen(channels, userFilter, contentFilter) {
        this._client.on('message', message => {
            if (message.system)
                return;
            if (!userFilter(message))
                return;
            if (message.content.startsWith(this._prefix)) {
                switch (message.content.replace(this._prefix + " ", "")) {
                    case "info":
                        console.log('info');
                        break;
                }
                return;
            }
            if (!contentFilter(message))
                return;
            const channel = channels.find(c => c.channel_id === message.channel.id);
            if (!channel)
                return;
            if (channel.listen) {
                this._brain.learn(message.content);
                if (channel.send) {
                    return message.channel.send(this._brain.generate(message.content));
                }
            }
        });
    }
}
exports.default = DiscordBrain;
