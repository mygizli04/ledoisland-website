interface Credit {
    name: string,
    role: string,
    description: string,
    email?: string
    image?: string
}

interface CreditData {
    team: Array<Credit>,
    artTeam: Array<Credit>
}

function nbsp(count: number) {
    let ret = ""
    for (let i = 0; i !== count; i++) {
        ret += "&nbsp;"
    }
    return ret
}

function strLength(str: string, length: number): string {
    if (str.length < length) {
        return nbsp(length - str.length) + str
    }
    else {
        return str
    }
}

function processTeam(member: Credit) {
    let divContents = '<div class="member">'

    let memberImage = ""
    if (member.image) {
        memberImage = member.image
    }
    else {
        memberImage = "https://mc-heads.net/avatar/" + member.name
    }

    divContents += '<img width=128 height=128 src="' + memberImage + '"><span class="memberInfo">' + nbsp(8) + '<b>' + member.name + '</b><br><i>' + strLength(member.role, 9 + member.name.length) + '</i><br><br>' + member.description + '</span>'

    if (member.email) {
        divContents += '<br><br>E-Mail: <a href="mailto:' + member.email + '">' + member.email + '</a>'
    }

    return divContents + "</div>"
}

fetch("credits.json").then(res => res.json().then((credits: CreditData) => {
    let divContents = ""
    credits.team.forEach(member => {
        divContents += processTeam(member)
    })
    document.getElementById("credits")!.innerHTML = divContents

    divContents = ""

    credits.artTeam.forEach(member => {
        divContents += processTeam(member)
    })

    document.getElementById("artCredits")!.innerHTML = divContents

}))