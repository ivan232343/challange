let input_put = document.querySelector("#de_cri"), manipule_side_img = document.querySelector(".__result--no_msg"), manipule_side_form = document.querySelector(".__result--box-decrypy"), input_out = document.querySelector("#out"), save;
const dictAlura = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat',
}
const toggle_mode = (element, show = true) => {
    if (show) { element.classList.remove("_hidden"); element.classList.add("_active") }
    else { element.classList.remove("_active"); element.classList.add("_hidden") }
}
const reversePojo = pojo => Object.keys(pojo).reduce((acum, key) => {
    const value = pojo[key]
    acum[value] = key
    return acum
}, {})
const rexifykeys = object => {
    const preRecified = Object.keys(object).join('|')
    return new RegExp(preRecified, "g")
}

/**
 * @param {string} text
 * @param {Record<string,string>} dict
 */
const replaceByDict = (text, dict) => text.replace(rexifykeys(dict), match => dict[match])

function cipherLens(dict = dictAlura) {
    const reversedDict = reversePojo(dict)
    return [
        text => replaceByDict(text, dict),
        text => replaceByDict(text, reversedDict)
    ]
}
const [cipher, decipher] = cipherLens()

document.querySelectorAll(".btn-crypt").forEach((e) => {
    e.onclick = (u) => {
        if (input_put.value !== "") {
            toggle_mode(manipule_side_img, false);
            toggle_mode(manipule_side_form)
            // input_out.value = input_put.value
        } else {
            toggle_mode(manipule_side_img);
            toggle_mode(manipule_side_form, false)
        }
        if (u.target.id === "crypt") {
            save = cipher(input_put.value)
        } else if (u.target.id === "decrypt") {
            save = decipher(input_put.value)
        } else if (u.target.id === "copy") {
            // input_out.select();
            // document.execCommand('copy');
            navigator.clipboard.writeText(input_out.value);
        }
        input_out.value = save
    }
})