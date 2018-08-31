<template>
  <div class="wallet-draw">
    <div class="panel balance">
      <div class="panel-header text-right text-12">明细 ＞</div>
      <div class="panel-body text-center">
        <p class="text-14">可提现余额(元)</p>
        <p class="text-30 blue">{{ available_balance }}</p>
      </div>
      <div class="panel-footer">
          <div class="pull-left text-center angle-right">
            {{ blocked_balance }}<br>冻结余额(元)
          </div>
          <div class="pull-right gray">
            鉴定贴完结后自动解冻
          </div>
      </div>
    </div>

    <div class="panel draw-cash">
      <div class="panel-header text-14">提现到我的钱包</div>
      <div class="panel-body text-30">￥<input type="number" v-model="withdraw_amount" v-on:keypress="validate" v-on:keyup="calculate" placeholder="0"></div>
      <div class="panel-footer">
        <div class="clearfix">
          <div class="pull-left gray">剩余金额￥{{ balance }}</div>
          <div class="pull-right blue" v-on:click="draw_all">全部提现</div>
        </div>
      </div>
    </div>

    <van-button size="large" class="confirm text-14" v-on:click="draw_cash_confirm">确认提现</van-button>
  </div>
</template>

<script>
import * as numeral from 'numeral'
import Vue from 'vue'
import { Button, Dialog, Toast } from 'vant'

Vue.use(Button)
Vue.use(Dialog)

export default {
  data () {
    return {
      available_balance: '0.00',
      blocked_balance: '0.00',
      withdraw_amount: '',
      balance: '0.00'
    }
  },
  // watch: {
  //   withdraw_amount: function (newValue, oldValue) {
  //     if (numeral(newValue).value() > numeral(this.available_balance).value()) {
  //       // MessageBox('提现金额', '不能超过 ￥' + this.available_balance);
  //       alert('提现金额：' + '不能超过 ￥' + this.available_balance)
  //       this.withdraw_amount = oldValue
  //       this.calc()
  //     }
  //   }
  // },
  created: function () {
    var url = 'https://mini.tosneaker.com/api/appraisal/drawCash/detail'
    var data = {
      token: this.$route.params.token
    }

    var self = this
    this.$http.get(url, {params: data}).then(
      res => {
        self.available_balance = '8.96' // res.body.data.appr_money;
        self.blocked_balance = '3.15' // res.body.data.appr_blocked_money;
        self.balance = numeral(self.available_balance).add(self.blocked_balance).format('0.00')
      },
      res => {
        console.log(res)
        if (res.status === 401) {
          Toast('认证失败，请重新登陆！')
        } else {
          Toast('服务器错误！')
        }
      }
    )
  },
  methods: {
    validate: function (event) {
      document.execCommand('SelectAll')
      var oldValue = document.getSelection().toString()
      document.execCommand('InsertText', false, oldValue)

      var newValue = oldValue + String.fromCharCode(event.keyCode)

      var reg = /^(0|[1-9]\d*)(\.\d{0,2})?$/

      if (!reg.test(newValue)) {
        event.preventDefault()
      }

      if (numeral(newValue).value() > numeral(this.available_balance).value()) {
        Dialog.alert({
          title: '提现金额',
          message: '不能超过可提现余额 ￥' + this.available_balance
        }).then(() => {
          // on close
        })
        event.preventDefault()
      }

      // console.log(event.srcElement.value)
      // console.log(newValue)
    },
    calculate: function () {
      var amount = numeral(this.available_balance).add(this.blocked_balance).value()
      var balance = numeral(amount).subtract(this.withdraw_amount).format('0.00')

      this.balance = balance > 0 ? balance : numeral(0).format('0.00')
    },
    draw_all: function () {
      this.withdraw_amount = this.available_balance
      this.calculate()
    },
    draw_cash_confirm: function () {
      var url = 'https://mini.tosneaker.com/api/appraisal/wallet/withdraw'
      var data = {
        token: this.$route.params.token,
        money: this.withdraw_amount
      }

      var self = this
      this.$http.post(url, data).then(
        res => {
          console.log(res)

          self.available_balance = numeral(self.available_balance).subtract(self.withdraw_amount).format('0.00')
          self.withdraw_amount = ''

          Dialog.alert({
            title: '提现成功',
            message: '钱已提到大钱包'
          }).then(() => {
            // on close
          })
        },
        res => {
          console.log(res)
          if (res.status === 401) {
            Toast('认证失败，请重新登陆！')
          } else {
            Toast('服务器错误！')
          }
        }
      )
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wallet-draw {
    padding: 12px 15px;
    color: #282828;
    font-size: 13px;
  }
  .panel {
    background: #fff;
    padding: 0 10px;
    border-radius: 3px;
    margin-bottom: 12px;
  }
  .panel > div {
    padding: 10px 0;
  }
  .panel-header {
    border-bottom: 1px solid #eef1f4;
  }
  .panel-footer {
    border-top: 1px solid #eef1f4;
  }

  .balance .panel-header {
    border: none;
    padding-top: 15px;
    padding-right: 5px;
  }
  .balance .panel-body {
    padding: 0;
  }
  .balance .blue {
    font-weight: bold;
    line-height: 30px;
    margin: 15px 0 36px;
  }
  .balance .panel-footer {
    margin: 0 -10px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .balance .panel-footer > div:first-child {
    width: 40%;
    padding: 10px 0;
    border-right: 1px solid #eef1f4;
    position: relative;
  }
  .balance .panel-footer > div:last-child {
    width: 60%;
    padding-left: 10%;
  }
  .balance .angle-right:after {
    content: " ";
    width: 8px;
    height: 8px;
    position: absolute;
    right: -5px;
    top: 50%;
    margin-top: -4px;
    transform: rotate(45deg);
    background: #fff;
    border-top: 1px solid #eef1f4;
    border-right: 1px solid #eef1f4;
  }

  .draw-cash .panel-body {
    padding: 30px 10px;
  }
  .draw-cash input {
    font-size: 30px;
    width: 200px;
    border: none;
  }
  .draw-cash input:focus {
    outline: none;
  }

  .confirm {
    margin-top: 100px;
    background: linear-gradient(-90deg, #5e95f4 0%, #3ba9f7 50%, #11c1fa 100%);
    color: #fff;
    height: 40px;
    line-height: 40px;
  }
</style>
