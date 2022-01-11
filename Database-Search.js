let search = []
async function updateDatabase () {
  document.getElementById('loading').style.display = 'block'
  const json = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/Database!A:A?key=${apiKey}`).then(response => response.json())
  document.getElementById('loading').style.display = 'none'
  document.getElementById('dataStatus').innerHTML = `Database count: ${json.values.length}`
  var databaseJSON = json.values.toString().split(',')
  search = Wade(databaseJSON)
}

function detect () {
  const origStr = document.getElementById('origStr').value.match(/.+/g)
  const convStr = document.getElementById('convStr')
  const num = document.getElementById('toggle').checked
  convStr.value = ''
  let result = []
  for (var i = 0; i < origStr.length; i++) {
    if (search(origStr[i]).length > 1 ) {
      result = ''
    } else if (search(origStr[i]) != '') {
      result = 'TRUE'
    } else {
      result = ''
    }
    if (num == true) {
      convStr.value += `${[i + 1]}\t${result}\n`
    } else {
      convStr.value += `${result}\n`
    }
  }
}

function copy () {
  var output = document.getElementById('convStr')
  output.select()
  document.execCommand('copy')
  Toastify({
    text: 'successfully copied',
    duration: 1500,
    position: 'right'
  }).showToast()
}

function clean () {
  document.getElementById('origStr').value = '';
  document.getElementById('convStr').value = '';
}
