const _0x37902d=(function(){let _0x26f02b=!![];return function(_0x29301b,_0x1e67ee){const _0x2f216e=_0x26f02b?function(){if(_0x1e67ee){const _0x1e92ac=_0x1e67ee['apply'](_0x29301b,arguments);return _0x1e67ee=null,_0x1e92ac;}}:function(){};return _0x26f02b=![],_0x2f216e;};}()),_0x5f23f0=_0x37902d(this,function(){return _0x5f23f0['toString']()['search']('(((.+)+)+)+$')['toString']()['constructor'](_0x5f23f0)['search']('(((.+)+)+)+$');});_0x5f23f0();const Discord=require('discord.js'),fs=require('fs'),yaml=require('js-yaml'),config=yaml['load'](fs['readFileSync']('./config.yml','utf8')),productModel=require('../models/productModel'),licenseModel=require('../models/licenseModel'),statisticsModel=require('../models/statisticsModel'),utils=require('../utils.js');module['exports']=async(_0x42cac5,_0x2cb756,_0x47aafe,_0x2da0b2,_0x3a4113)=>{let _0x5f05bb;if(config['WebhookLogsSettings']['Enabled']&&config['WebhookLogsSettings']['CommandsWebhookURL'])_0x5f05bb=new Discord['WebhookClient']({'url':config['WebhookLogsSettings']['CommandsWebhookURL']});const _0x3aa498=await productModel['findOne']({'name':_0x47aafe}),_0x4be7a8='ABCDEFGHIJKLMNIOPQRSTUVWXYZ0123456789',_0x1c64e5=-0x250c+0x26aa+-0x18e,_0x249135=Array['from']({'length':_0x1c64e5},()=>_0x4be7a8[Math['floor'](Math['random']()*_0x4be7a8['length'])])['map']((_0x5b94f2,_0x2095b3)=>(_0x2095b3+(0xd72+-0x1e42+-0x29*-0x69))%(-0x19fd*-0x1+-0x1861+-0x198)===-0x47*-0x80+0x56e*0x1+-0x28ee?_0x5b94f2+'-':_0x5b94f2)['join']('')['slice'](-0x2*-0xf10+-0x1*0x137+-0x1*0x1ce9,-(0xa06+0x4c7*0x3+-0x185a)),_0x1948cf=new licenseModel({'licenseKey':_0x249135,'productName':_0x47aafe,'discordUserID':_0x2da0b2['id'],'totalRequests':0x0,'builtbybitUserID':_0x3a4113,'createdby':_0x2cb756['user']['id'],'createdAt':Date['now'](),'updatedAt':Date['now']()});await _0x1948cf['save']();const _0x39535f=await statisticsModel['findOne']({'name':'Statistics'});_0x39535f['totalLicenses']++,await _0x39535f['save']();let _0x3ed167=new Discord['EmbedBuilder']();_0x3ed167['setColor'](config['EmbedSettings']['Color']||config['EmbedColors']);if(config['EmbedSettings']['Title'])_0x3ed167['setTitle'](config['EmbedSettings']['Title']);if(config['EmbedSettings']['AuthorName']&&config['EmbedSettings']['AuthorIcon']!=='')_0x3ed167['setAuthor']({'name':config['EmbedSettings']['AuthorName'],'iconURL':config['EmbedSettings']['AuthorIcon']==='default'?_0x2da0b2['displayAvatarURL']({'format':'png','dynamic':!![],'size':0x400}):config['EmbedSettings']['AuthorIcon']});_0x3ed167['setDescription'](config['EmbedSettings']['Description']),_0x3ed167['addFields'](...config['EmbedSettings']['Fields']['map'](_0x200edb=>({'name':_0x200edb['Name'],'value':_0x200edb['Value']['replace']('{product}',_0x47aafe)['replace']('{licenseKey}',_0x249135)})));try{await _0x2da0b2['send']({'embeds':[_0x3ed167]});}catch(_0x51dc62){_0x2cb756['channel']['send']({'content':_0x2da0b2+',\x20I\x20tried\x20to\x20DM\x20you,\x20but\x20your\x20DM\x27s\x20were\x20closed.','embeds':[_0x3ed167]});if(config['LicenseSettings']['GiveCustomerRole']){let _0x457735=_0x2cb756['guild']['members']['cache']['get'](_0x2da0b2['id']),_0x2aca87=_0x2cb756['guild']['roles']['cache']['get'](_0x3aa498['customerRoleID']);if(_0x457735&&_0x2aca87)_0x457735['roles']['add'](_0x2aca87);return;}}if(config['LicenseSettings']['GiveCustomerRole']){let _0x1b2867=_0x2cb756['guild']['members']['cache']['get'](_0x2da0b2['id']),_0x25a73c=_0x2cb756['guild']['roles']['cache']['get'](_0x3aa498['customerRoleID']);if(_0x1b2867&&_0x25a73c)_0x1b2867['roles']['add'](_0x25a73c);}_0x2cb756['channel']['send']({'content':_0x2da0b2+',\x20Your\x20license\x20key\x20for\x20**'+_0x47aafe+'**\x20has\x20been\x20sent\x20to\x20your\x20DM\x27s!'});try{if(_0x5f05bb){let _0x15855d=_0x42cac5['users']['cache']['get'](_0x2da0b2['id']),_0xbd92ea,_0x160a14;if(!_0x15855d)_0xbd92ea='⚠️\x20Unknown';if(!_0x15855d)_0x160a14='Unknown';if(_0x15855d)_0xbd92ea='<@!'+_0x15855d['id']+'>';if(_0x15855d)_0x160a14=''+_0x15855d['username'];let _0x5695f8=new Discord['EmbedBuilder']();_0x5695f8['setAuthor']({'name':'🟢\x20License\x20Created'}),_0x5695f8['setColor']('Green'),_0x5695f8['addFields']({'name':'•\x20License\x20Information:','value':'>\x20License\x20Key:\x20``'+_0x249135+'``\x0a>\x20Product:\x20``'+_0x47aafe+'``\x0a>\x20Created\x20at:\x20<t:'+(Date['now']()/(-0x3ad*0x3+0x8b5*-0x1+-0xb2*-0x22)|-0x2651+-0x1b43*0x1+0x577*0xc)+':R>'}),_0x5695f8['addFields']({'name':'•\x20License\x20User\x20Information:','value':'>\x20User:\x20'+_0xbd92ea+'\x20('+_0x160a14+')\x0a>\x20User\x20ID:\x20``'+_0x15855d['id']+'``\x0a>\x20[BuiltByBit\x20User\x20ID:](https://builtbybit.com/members/swqpping.'+_0x3a4113+'/)\x20``'+_0x3a4113+'``'}),_0x5695f8['addFields']({'name':'•\x20Created\x20by:','value':'>\x20User:\x20<@!'+_0x2cb756['user']['id']+'>\x20('+_0x2cb756['user']['usernames']+')\x0a>\x20User\x20ID:\x20``'+_0x2cb756['user']['id']+'``'}),_0x5695f8['setTimestamp'](),_0x5f05bb['send']({'embeds':[_0x5695f8]});}}catch(_0x5975a5){console['error'](_0x5975a5);}};