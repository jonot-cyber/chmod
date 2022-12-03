let userRead = document.getElementById("user-read")
let userWrite = document.getElementById("user-write")
let userExecute = document.getElementById("user-execute")

let groupRead = document.getElementById("group-read")
let groupWrite = document.getElementById("group-write")
let groupExecute = document.getElementById("group-execute")

let allRead = document.getElementById("all-read")
let allWrite = document.getElementById("all-write")
let allExecute = document.getElementById("all-execute")

let setuid = document.getElementById("setuid")
let setgid = document.getElementById("setgid")
let sticky = document.getElementById("sticky")

// get single char from permission
function getPermissionChar(read, write, execute) {
    let char = 0
    if (read) {
        char += 4
    }
    if (write) {
        char += 2
    }
    if (execute) {
        char += 1
    }
    return char
}

function updateValue() {
    let result = document.querySelector("p.result");
    let userPermissions = getPermissionChar(userRead.checked, userWrite.checked, userExecute.checked)
    let groupPermissions = getPermissionChar(groupRead.checked, groupWrite.checked, groupExecute.checked)
    let allPermissions = getPermissionChar(allRead.checked, allWrite.checked, allExecute.checked)

    let firstBit = 0
    if (setuid.checked) {
        firstBit += 4
    }
    if (setgid.checked) {
        firstBit += 2
    }
    if (sticky.checked) {
        firstBit += 1
    }

    result.textContent = `chmod ${firstBit}${userPermissions}${groupPermissions}${allPermissions} filename`
}


for (let item of ["user", "group", "all"]) {
    for (let permission of ["read", "write", "execute"]) {
        document.getElementById(`${item}-${permission}`).onchange = updateValue
    }
}
setuid.onchange = updateValue
setgid.onchange = updateValue
sticky.onchange = updateValue

updateValue()

// copy button
document.querySelector(".copy-button").addEventListener("click", event => {
    navigator.clipboard.writeText(document.querySelector("p.result").textContent)
})