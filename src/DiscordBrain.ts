import Brain from './Brain'
import {Client} from 'discord.js'
import Dataset from './Dataset'
interface ListenChannel {
  channel_id: string
  listen: boolean
  send: boolean
}
export default class DiscordBrain {
  private _brain: Brain;
  private _adapters: Function[];
  private _client: Client;
  private _prefix: string;
  constructor(client: Client, dbFilename: string, datasets: Dataset[], adapters: Function[], prefix: string) {
    this._client = client
    this._adapters = adapters
    this._brain = new Brain(dbFilename, datasets)
    this._prefix = prefix
  }
  setPrefix(prefix: string): DiscordBrain {
    this._prefix = prefix
    return this
  }
  get prefix() {
    return this._prefix
  }
  setAdapters(adapters: Function[]): DiscordBrain {
    this._adapters = adapters
    return this
  }
  get adapters() {
    return this._adapters
  }
  addAdapter(adapter: Function): DiscordBrain {
    this._adapters.push(adapter)
    return this
  }
  build(): DiscordBrain {
    this._brain.build()
    return this
  }
  listen(channels: Array<ListenChannel>, userFilter: Function, contentFilter: Function) {
    this._client.on('message', message=>{
      if(message.system) return
      if(!userFilter(message)) return
      if(message.content.startsWith(this._prefix)) {
        switch(message.content.replace(this._prefix+" ", "")) {
          case "info":
            console.log('info')
            break;
        }
        return;
      }
      if(!contentFilter(message)) return
      const channel = channels.find(c=>c.channel_id === message.channel.id)
      if(!channel) return
      if(channel.listen) {
        this._brain.learn(message.content)
        if(channel.send) {
          return message.channel.send(this._brain.generate(message.content))
        }
      }
    })
  }
}
