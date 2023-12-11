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

    <vs-dialog  modal  :visible="showDaySkills" @update:visible="(v) => showDaySkills = v"
    >
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

    <vs-dialog modal  :visible="showDaySkillsDetail" @update:visible="(v) => showDaySkillsDetail = v"
    >
      <template #header>
        <h4 class=" text-white">
          Дневная способность
        </h4>
      </template>

      <div class="con-content ">
        <div v-if="activeUserCard">
          <img :src="activeUserCard.ava" style="width: 100%;max-width: 120px" alt="">
          <hr class="opacity-50 my-3"/>
          <div style="max-width: calc(100% - 20px);">
            <template v-if="activeUserCard.name === names.Assassin">
              <InputText placeholder="Номер игрока" v-model.trim="assassinKill">
              </InputText>

              <div style="pointer-events: none" class="mt-2">
                <InputText placeholder="Роль" v-model="assassinKillRole">
                </InputText>
              </div>

              <div class="text-sm text-white mb-2 mt-2">Выберите роль кликнув на иконку</div>
              <div v-if="Array.isArray(users)" class="flex flex-wrap gap-3">
                <vs-avatar v-for="user in users.filter(u => !u.killed)" :key="'assasinKill-' + user.number" size="large"
                           @click="assassinKillRole = user.name"
                  :image="user.ava"
                >
                </vs-avatar>
              </div>

              <br/>
              <Button @click="action('assassin')">
                Сопоставить и узнать результат
              </Button>
            </template>

            <template v-if="activeUserCard.name === names['Loose Cannon']">
              <br/>
              <div style="pointer-events: none">
                <InputText placeholder="Роль" v-model.trim="looseCannon" />
              </div>
              <br/>

              <div class="text-sm text-white mb-2">Выберите роль кликнув на иконку</div>
              <div v-if="Array.isArray(users)" class="flex flex-wrap gap-3">
                <vs-avatar v-for="user in users.filter(u => !u.killed)" :key="'looseCannonKill-' + user.number" size="large"
                           @click="looseCannon = user.name" :image="user.ava">
                </vs-avatar>
              </div>

              <br/>
              <Button @click="action('looseCannon')">
               Убить
              </Button>
            </template>

            <template v-if="activeUserCard.name === names['(D.O.B.) Dirty Old Bastard']">
              <br/>
              <InputText placeholder="Убить игрока:" v-model.trim="DOBtarget">
              </InputText>

              <div class="text-sm text-white mb-2">Выберите игрока кликнув на иконку</div>
              <div v-if="Array.isArray(users)" class="flex flex-wrap gap-3">
                <vs-avatar v-for="user in users.filter(u => !u.killed)" :key="'DOBKill-' + user.number" badge-color="primary" badge size="large"
                           @click="DOBtarget = user.number" :image="user.ava" v-badge="user.number">
                </vs-avatar>
              </div>

              <br/>
              <Button v-if="DOBtarget" @click="action('dob')">
                Убить: {{ DOBtarget }} Игрока
              </Button>
            </template>

            <template v-if="activeUserCard && activeUserCard.name === names.Nurse">
              <div class="text-sm text-white mb-2">Выберите роль кликнув на иконку</div>
              <InputText v-model="nurseChoose"></InputText>
              <div v-if="Array.isArray(users)" class="flex flex-wrap gap-3 mb-3 mt-2">
                <vs-avatar v-for="user in users.filter(u => !u.killed)" :key="'assasinKill-' + user.number" size="large"
                           @click="nurseChoose = user.name" :image="user.ava">
                </vs-avatar>
              </div>
              <Button v-if="nurseChoose" @click="action('nurse')">
                Добавить жизнь - {{ nurseChoose }}
              </Button>
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
import { toast } from 'vue3-toastify';


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
              toast.success(`Ассасин угадал, игрок ${personNumber} - ${this.assassinKillRole}`)
              personIndex = this.users.findIndex(user => user.name === this.assassinKillRole)
              this.$emit('update:action', personIndex, 'kill')
            } else {
              toast.error('Ассасин не угадал, он убит')
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