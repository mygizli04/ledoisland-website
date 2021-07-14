// This file is for the minecraft check (client side)

function parseColor(color: string) {
    switch (color) {
        case "dark_green":
            return "DarkGreen"
        case "dark_aqua":
            return "DarkCyan"
        default:
            console.error("Unkown color: " + color)
            debugger
            return color
    }
}

fetch("/server").then(res => res.json().then((data: Server) => {
    if (data.error) {
        document.body.innerHTML = data.errorMessage!
    }
    else {
        let description = data.description.text
        if (data.description.extra) {
            data.description.extra.forEach((motd: {color: string, text: string}) => {
                description += '<span style="color: ' + parseColor(motd.color) + ';">' + motd.text + "</span>"
            })
        }
        document.body.innerHTML = `Description: ${description}<br>Latency: ${data.latency}<br>Players: ${data.players.online}/${data.players.max}<br>Version: ${data.version.name}<br>`
    }
}))

interface Server {
    error: boolean;
    errorMessage?: string;
    description: Description;
    players:     Players;
    version:     Version;
    latency:     number;
}

interface Description {
    extra: Extra[];
    text:  string;
}

interface Extra {
    color: string;
    text:  string;
}

interface Players {
    max:    number;
    online: number;
}

interface Version {
    name:     string;
    protocol: number;
}