fx_version 'cerulean'
game 'gta5'

ui_page 'html/ui.html'

files {
    'html/ui.html',
    'html/script.js',
    "html/img/*.svg",
    'html/style.css',
}

client_script 'client/client.lua'

server_script 'server/server.lua'

shared_script 'config.lua'

dependencies {
    'es_extended',
    'esx_society'
}