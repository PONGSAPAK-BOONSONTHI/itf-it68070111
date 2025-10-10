const acc_input = document.getElementById('account-balance')
const cash_input = document.getElementById('cash-balance')
const money = document.getElementById('transaction-amount')
const history_box = document.getElementById('transaction-history')
const my_input = document.getElementById("my_input")

let acc_balance = 0
let cash_balance = 0
let current_value = 1

document.addEventListener('DOMContentLoaded', function() {
  acc_input.value = acc_balance
  cash_input.value = cash_balance
})

function setBalanceValues() {
  const account_value = parseFloat(acc_input.value) || 0
  const cash_value = parseFloat(cash_input.value) || 0

  acc_balance = account_value
  cash_balance = cash_value

  const now = new Date().toLocaleString('th-TH')
  history_box.value = now + " - กำหนดยอด: บัญชี " + acc_balance + " เงินสด " + cash_balance + "\n"
}

function depositMoney() {
  const money_input = parseFloat(money.value)

  if (isNaN(money_input) || money_input <= 0) {
    alert("กรุณากรอกเงินให้ถูกต้อง")
    return
  }

  if (money_input > cash_balance) {
    alert("เงินสดไม่พอ")
    return
  }

  cash_balance = cash_balance - money_input
  acc_balance = acc_balance + money_input

  const time = new Date().toLocaleString('th-TH')
  history_box.value += time + " - ฝาก " + money_input + " บาท\n"

  acc_input.value = acc_balance.toFixed(2)
  cash_input.value = cash_balance.toFixed(2)
  money.value = ""
}

function withdrawMoney() {
  const money_input = parseFloat(money.value)

  if (isNaN(money_input) || money_input <= 0) {
    alert("กรุณากรอกเงินให้ถูกต้อง")
    return
  }

  if (money_input > acc_balance) {
    alert("เงินในบัญชีไม่พอ")
    return
  }

  acc_balance = acc_balance - money_input
  cash_balance = cash_balance + money_input

  const time = new Date().toLocaleString('th-TH')
  history_box.value += time + " - ถอน " + money_input + " บาท\n"

  acc_input.value = acc_balance.toFixed(2)
  cash_input.value = cash_balance.toFixed(2)
  money.value = ""
}

function calc(x) {
  if (my_input) {
    current_value = current_value + Number(x)
    my_input.value = current_value
  }
}

// Task 3: Currency Converter API Integration
async function convertCurrency() {
  const inputBalance = document.getElementById('input-balance')
  const outputBalance = document.getElementById('output-balance')
  const inputCurrency = document.getElementById('input-currency')
  
  const amount = parseFloat(inputBalance.value)
  const fromCurrency = inputCurrency.value
  const toCurrency = fromCurrency === 'USD' ? 'THB' : 'USD'
  
  if (isNaN(amount) || amount <= 0) {
    alert('กรุณากรอกจำนวนเงินให้ถูกต้อง')
    return
  }
  
  try {
    const response = await fetch('http://localhost:3000/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency
      })
    })
    
    const result = await response.json()
    
    if (response.ok) {
      outputBalance.value = result.convertedAmount
      
      // Update the display to show conversion info
      const time = new Date().toLocaleString('th-TH')
      console.log(`${time} - แปลง ${result.originalAmount} ${result.originalCurrency} เป็น ${result.convertedAmount} ${result.targetCurrency} (อัตราแลกเปลี่ยน: ${result.exchangeRate})`)
    } else {
      alert('เกิดข้อผิดพลาดในการแปลงสกุลเงิน: ' + result.error)
    }
  } catch (error) {
    alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้: ' + error.message)
  }
}