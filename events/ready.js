const _0x1891b1=(function(){let _0x4031ef=!![];return function(_0x570536,_0xf4bb32){const _0xbd00b8=_0x4031ef?function(){if(_0xf4bb32){const _0x3090cf=_0xf4bb32['apply'](_0x570536,arguments);return _0xf4bb32=null,_0x3090cf;}}:function(){};return _0x4031ef=![],_0xbd00b8;};}()),_0x3c2177=_0x1891b1(this,function(){return _0x3c2177['toString']()['search']('(((.+)+)+)+$')['toString']()['constructor'](_0x3c2177)['search']('(((.+)+)+)+$');});_0x3c2177();const fs=require('fs'),yaml=require('js-yaml'),config=yaml['load'](fs['readFileSync']('./config.yml','utf8')),color=require('ansi-colors'),botVersion=require('../package.json'),Discord=require('discord.js'),mongoose=require('mongoose'),licenseModel=require('../models/licenseModel'),statisticsModel=require('../models/statisticsModel'),utils=require('../utils.js'),productLoader=require('../productLoader');module['exports']=async _0x3d261e=>{let _0x9dbb8=_0x3d261e['guilds']['cache']['get'](config['GuildID']);!_0x9dbb8&&(console['log']('\x1b[31m%s\x1b[0m','[ERROR]\x20The\x20guild\x20ID\x20specified\x20in\x20the\x20config\x20is\x20invalid\x20or\x20the\x20bot\x20is\x20not\x20in\x20the\x20server!\x0aYou\x20can\x20use\x20the\x20link\x20below\x20to\x20invite\x20the\x20bot\x20to\x20your\x20server:\x0ahttps://discord.com/api/oauth2/authorize?client_id='+_0x3d261e['user']['id']+'&permissions=8&scope=bot%20applications.commands'),process['exit']());config['DevMode']&&(console['log']('\x1b[31m%s\x1b[0m','[WARNING]\x20DevMode\x20is\x20enabled!\x20All\x20command\x20permissions\x20disabled.'),console['log']('\x1b[31m%s\x1b[0m','[WARNING]\x20DevMode\x20is\x20enabled!\x20All\x20command\x20permissions\x20disabled.'),console['log']('\x1b[31m%s\x1b[0m','[WARNING]\x20DevMode\x20is\x20enabled!\x20All\x20command\x20permissions\x20disabled.'));const _0x5c7a60=await statisticsModel['findOne']();if(!_0x5c7a60||_0x5c7a60?.['length']==0x219d*-0x1+-0x1b*-0x11c+0x3a9){const _0x23dd37=new statisticsModel({'name':'Statistics','totalLicenses':0x0,'totalRequests':0x0,'timesBotStarted':0x0});await _0x23dd37['save']();}_0x5c7a60&&!_0x5c7a60['timesBotStarted']&&(_0x5c7a60['timesBotStarted']=-0x2333+0x294+0x209f,await _0x5c7a60['save']());let _0x2d5b4c;if(config['BotActivitySettings']['Type']==='WATCHING')_0x2d5b4c=Discord['ActivityType']['Watching'];if(config['BotActivitySettings']['Type']==='PLAYING')_0x2d5b4c=Discord['ActivityType']['Playing'];if(config['BotActivitySettings']['Type']==='COMPETING')_0x2d5b4c=Discord['ActivityType']['Competing'];if(config['BotActivitySettings']['Enabled']&&config['BotActivitySettings']['Statuses']&&config['BotActivitySettings']['Statuses']?.['length']>-0x946*-0x3+0x26c7+-0x4298){const _0x1b81e9=await statisticsModel['findOne']({'name':'Statistics'});let _0x5d4c60=-0x605+0x4*-0x9c2+0x2d0d;_0x3d261e['user']['setActivity'](config['BotActivitySettings']['Statuses'][_0x5d4c60]['replace'](/{total-users}/g,''+_0x9dbb8['memberCount']['toLocaleString']('en-US'))['replace'](/{total-channels}/g,''+_0x3d261e['channels']['cache']['size'])['replace'](/{total-licenses}/g,''+_0x1b81e9['totalLicenses']['toLocaleString']('en-US'))['replace'](/{total-requests}/g,''+_0x1b81e9['totalRequests']['toLocaleString']('en-US')),{'type':_0x2d5b4c}),setInterval(async()=>{const _0x2e73e1=await statisticsModel['findOne']({'name':'Statistics'});if(_0x5d4c60===config['BotActivitySettings']['Statuses']['length'])_0x5d4c60=-0x253f+0x2421*0x1+0x11e;_0x3d261e['user']['setActivity'](config['BotActivitySettings']['Statuses'][_0x5d4c60]['replace'](/{total-users}/g,''+_0x9dbb8['memberCount']['toLocaleString']('en-US'))['replace'](/{total-channels}/g,''+_0x3d261e['channels']['cache']['size'])['replace'](/{total-licenses}/g,''+_0x2e73e1['totalLicenses']['toLocaleString']('en-US'))['replace'](/{total-requests}/g,''+_0x2e73e1['totalRequests']['toLocaleString']('en-US')),{'type':_0x2d5b4c}),_0x5d4c60++;},config['BotActivitySettings']['Interval']*(0x6fd+-0x2143+-0x1e2e*-0x1));}await require('../authorize');const _0xd684c6=await statisticsModel['findOne']({'name':'Statistics'});await console['log']('――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――'),await console['log']('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'),await console['log'](''+color['green']['bold']['underline']('Plex\x20Licenses\x20v'+botVersion['version']+'\x20is\x20now\x20Online!')),await console['log']('•\x20By\x20using\x20this\x20bot\x20you\x20agree\x20to\x20all\x20terms\x20located\x20here,\x20'+color['yellow']('plexdevelopment.net/tos'));if(config['Statistics'])await console['log']('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20');if(config['Statistics'])await console['log'](''+color['green']['bold']['underline']('Statistics:'));if(config['Statistics'])await console['log']('•\x20The\x20bot\x20has\x20been\x20started\x20a\x20total\x20of\x20'+color['cyan']['underline'](''+_0xd684c6['timesBotStarted']['toLocaleString']('en-US'))+'\x20times.');if(config['Statistics'])await console['log']('•\x20A\x20total\x20of\x20'+color['cyan']['underline'](''+_0xd684c6['totalLicenses']['toLocaleString']('en-US'))+'\x20license\x20keys\x20have\x20been\x20created.');if(config['Statistics'])await console['log']('•\x20A\x20total\x20of\x20'+color['cyan']['underline'](''+_0xd684c6['totalRequests']['toLocaleString']('en-US'))+'\x20API\x20requests\x20have\x20been\x20made.');await console['log']('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'),await console['log'](''+color['green']['bold']['underline']('Source\x20Code:')),await console['log']('•\x20You\x20can\x20buy\x20the\x20full\x20source\x20code\x20at\x20'+color['yellow']('plexdevelopment.net/store/plsourcecode')),await console['log']('•\x20Use\x20code\x20'+color['green']['bold']['underline']('PLEX')+'\x20for\x2010%\x20OFF!'),await console['log']('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'),await console['log']('――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――');let _0x39ecdd='\x0a\x0a['+new Date()['toLocaleString']()+']\x20[READY]\x20Bot\x20is\x20now\x20ready!';fs['appendFile']('./logs.txt',_0x39ecdd,_0xd4207f=>{if(_0xd4207f)console['log'](_0xd4207f);});const _0x450440=await statisticsModel['findOne']({'name':'Statistics'});_0x450440['timesBotStarted']++,await _0x450440['save']();};