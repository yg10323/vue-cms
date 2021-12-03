import { io } from "socket.io-client";
import { web_socket_config } from '../../../config.json'

// socket客户端
export class SoClient {

    constructor(action) {
        this.host = web_socket_config.host;
        this.port = web_socket_config.port;
        this.action = action || null;
        this.client = io(`${this.host}:${this.port}`)
        this.client.on("connect", () => {
            this.stid = this.client.id;
            console.log('scoket连接成功 ' + this.stid);
        })

        // 监听异常
        this.client.on('error', error => {
            console.log(error);
        })

        // 监听服务端是否断开
        this.client.on('disconnect', () => {
            console.log(`${this.stid} 连接已断开`);
        })

        this.initGetQrCode()

        // 启动心跳
        // this.heartCheck()

        return this.client;
    }

    // 用于某些刚连接好即需要通信的连接
    initGetQrCode() {
        if (this.action) {
            // console.log(222222222);
            this.client.emit(this.action);
        }
    }

    // 暂留 目前的服务器承受不住心跳包带来的压力, 所以暂时关闭心跳
    // 心跳包
    heartCheck() {
        this.heartTimer = setInterval(() => {
            this.client.emit('fromClient', JSON.stringify({
                cmd: "heart",
                content: {}
            }))
        }, 1000);
    }

    // 重置心跳
    resetHeartCheck() {
        this.heartTimer && clearInterval(this.heartTimer);
        this.heartCheck();
    }

    static getInstance(action) {
        return new SoClient(action);
    }
};

