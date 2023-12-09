<template>
  <button @click="showDaySkills = true;showDaySkillsDetail=false" data-tooltip-target="tooltip-profile" type="button"
          class="inline-flex flex-col items-center justify-center px-5 rounded-e-full  group">
    <svg style="width: 30px;" :fill="false ?  'rgb(25,91,255)' : '#d5d6d7'" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"><title>alpha-s-circle-outline</title>
      <path
          d="M11,7H15V9H11V11H13A2,2 0 0,1 15,13V15A2,2 0 0,1 13,17H9V15H13V13H11A2,2 0 0,1 9,11V9A2,2 0 0,1 11,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
    </svg>
    <span class="sr-only">Profile</span>
    <div class="" style="font-size: 10px;line-height: 1.1;opacity: .5">Дневная способность</div>

    <vs-dialog width="500px" scroll blur full-screen auto-width v-model="showDaySkills">
      <template #header>
        <h4 class="not-margin text-white">
          Дневная способность
        </h4>
      </template>

      <div class="con-content">
        <ChooseUser
            :title="'Выберите кто хочет использовать способность:'"
            :imageMode="true"
            @update:selectActive="setUser"
            :users="skillsUser"
        />
      </div>
    </vs-dialog>

    <vs-dialog width="500px" scroll full-screen blur auto-width
               v-model="showDaySkillsDetail"
    >
      <template #header>
        <h4 class=" text-white">
          Дневная способность
        </h4>
      </template>

      <div class="con-content ">
        <div v-if="activeUserCard">
          <vs-avatar
              badge
              badge-color="primary"
              size="100"
          >

            <img :src="activeUserCard.ava" alt="">
            <template #badge>
              {{ activeUser }}
            </template>
          </vs-avatar>
          <hr class="opacity-50 my-3"/>
          <div style="max-width: calc(100% - 20px);">
            <template v-if="activeUserCard.name === names.Assassin">
              <br/>
              <vs-input label="Номер игрока" v-model.trim="assassinKill">
              </vs-input>

              <br/>
              <div style="pointer-events: none">
                <vs-input label="Роль" v-model="assassinKillRole">
                </vs-input>
              </div>
              <br/>

              <div class="text-sm text-white mb-2">Выберите роль кликнув на иконку</div>
              <div v-if="Array.isArray(users)" class="flex flex-wrap gap-3">
                <vs-avatar v-for="user in users.filter(u => !u.killed)" :key="'assasinKill-' + user.number" size="55"
                           @click="assassinKillRole = user.name">
                  <img :src="user.ava" alt="">
                </vs-avatar>
              </div>

              <br/>
              <vs-button @click="action('assassin')">
                Сопоставить и узнать результат
              </vs-button>
            </template>

            <template v-if="activeUserCard.name === names['Loose Cannon']">
              <br/>
              <div style="pointer-events: none">
                <vs-input label="Роль" v-model.trim="looseCannon">
                </vs-input>
              </div>
              <br/>

              <div class="text-sm text-white mb-2">Выберите роль кликнув на иконку</div>
              <div v-if="Array.isArray(users)" class="flex flex-wrap gap-3">
                <vs-avatar v-for="user in users.filter(u => !u.killed)" :key="'looseCannonKill-' + user.number" size="55"
                           @click="looseCannon = user.name">
                  <img :src="user.ava" alt="">
                </vs-avatar>
              </div>

              <br/>
              <vs-button @click="action('looseCannon')">
               Убить
              </vs-button>
            </template>

            <template v-if="activeUserCard.name === names['(D.O.B.) Dirty Old Bastard']">
              <br/>
              <vs-input label="Убить игрока:" v-model.trim="DOBtarget">
              </vs-input>

              <div class="text-sm text-white mb-2">Выберите игрока кликнув на иконку</div>
              <div v-if="Array.isArray(users)" class="flex flex-wrap gap-3">
                <vs-avatar v-for="user in users.filter(u => !u.killed)" :key="'DOBKill-' + user.number" badge-color="primary" badge size="55"
                           @click="DOBtarget = user.number">
                  <img :src="user.ava" alt="">
                  <template #badge>
                    {{ user.number }}
                  </template>
                </vs-avatar>
              </div>

              <br/>
              <vs-button v-if="DOBtarget" @click="action('dob')">
                Убить: {{ DOBtarget }} Игрока
              </vs-button>
            </template>

            <template v-if="activeUserCard && activeUserCard.name === names.Nurse">
              <div class="text-sm text-white mb-2">Выберите роль кликнув на иконку</div>
              <vs-input v-model="nurseChoose">

              </vs-input>
              <br/>
              <div v-if="Array.isArray(users)" class="flex flex-wrap gap-3 mb-3">
                <vs-avatar v-for="user in users.filter(u => !u.killed)" :key="'assasinKill-' + user.number" size="55"
                           @click="nurseChoose = user.name">
                  <img :src="user.ava" alt="">
                </vs-avatar>
              </div>
              <vs-button v-if="nurseChoose" @click="action('nurse')">
                Добавить жизнь - {{ nurseChoose }}
              </vs-button>
            </template>


          </div>
        </div>
      </div>
    </vs-dialog>
  </button>

</template>

<script>
import ChooseUser from "@/components/ChooseUser";
import {dayPersonWhoHaveSkills} from "@/js/GameModData";
import {names} from "@/store/cards";

export default {
  name: 'DaySkillModal',
  components: {ChooseUser},
  props: ['users'],
  data() {
    return {
      showDaySkills: false,
      showDaySkillsDetail: false,
      activeUser: [],
      names: names,
      DOBtarget: null,

      nurseChoose: '',
      looseCannon: '',

      assassinKill: '',
      assassinKillRole: null,
    }
  },
  methods: {
    setUser(user) {
      this.activeUser = user[0] || []
      this.showDaySkills = false
      this.showDaySkillsDetail = true
    },
    action(type) {
      let person, personNumber, personIndex;
      let assassin = this.users.findIndex(user => user?.name === names.Assassin)
      let looseCannon = this.users.findIndex(user => user?.name === names['Loose Cannon'])

      switch (type) {
        case 'looseCannon':
          if(!this.looseCannon){
            return alert('Выберите персонажа')
          }

          personIndex = this.users.findIndex(user => user?.name === this.looseCannon)

          if (personIndex === -1) {
            return alert('Не правильная роль, игрок не найден')
          }


          this.$emit('update:action', looseCannon, 'kill')
          this.$emit('update:action', personIndex, 'kill')
          return;
        case 'dob':
          if (!this.DOBtarget) {
            return alert('Выберите персонажа')
          }

          personIndex = this.users.findIndex(user => user?.number === this.DOBtarget)

          if (personIndex === -1) {
            return alert('Не правильная роль, игрок не найден')
          }

          this.$emit('update:action', personIndex, 'kill')

          return;
        case 'nurse':
          if (!this.nurseChoose) {
            return alert('Выберите персонажа')
          }

          personIndex = this.users.findIndex(user => user?.name === this.nurseChoose)

          if (personIndex === -1) {
            return alert('Не правильная роль, игрок не найден')
          }

          this.$emit('update:action', personIndex, 'addHeart')

          return null;
        case 'assassin':
          if (!this.assassinKill || !this.assassinKillRole) {
            return alert('Не полные данные')
          }

          person = this.users.find(user => user?.name === this.assassinKillRole)

          if (!person) {
            return alert('Не правильная роль, игрок не найден')
          }

          personNumber = person.number

          console.log(personNumber, this.assassinKill)

          this.showDaySkillsDetail = false
          this.showDaySkills = false

          setTimeout(() => {
            if (personNumber === this.assassinKill) {
              this.$toast.success(`Ассасин угадал, игрок ${personNumber} - ${this.assassinKillRole}`)
              personIndex = this.users.findIndex(user => user.name === this.assassinKillRole)
              this.$emit('update:action', personIndex, 'kill')
            } else {
              this.$toast.error('Ассасин не угадал, он убит')
              this.$emit('update:action', assassin, 'kill')
            }
          }, 500)
          return null;
      }
    }
  },
  computed: {
    activeUserCard() {
      if (!this.activeUser || !Array.isArray(this.users)) return null

      return this.users.find(user => user.number === this.activeUser)
    },
    skillsUser() {
      if(!Array.isArray(this.users)){
        return []
      }

      const arr = dayPersonWhoHaveSkills

      return this.users
          .filter(u => !u.killed)
          .filter(user => arr.includes(user.name))
    }
  }
}
</script>

<style scoped>

</style>