var socketio = require('socket.io');
var _ = require('lodash');

var evenList = {};

var io = {
    socket : null,
    init : function(server){//初始化
        this.socket = socketio(server)
        if(evenList.create){
            _.forEach(evenList.create,function(n){
                n( this.socket );
            }.bind(this))
        }
    },
    on : function( even , callback ){//事件监听
        if(_.isFunction(callback)){
            if(this.socket && even === 'create') {
                callback(this.socket);
                return;
            }
            if(evenList[even]){
                evenList[even].push(callback);
            }else{
                evenList[even] = [ callback ];
            }
        }else{
            throw new Error('callback is not a function');
        }
    }
};

module.exports = io;