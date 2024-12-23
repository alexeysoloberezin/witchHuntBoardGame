<template>
  <div class="min-h-screen text-white p-3 bg-gray-200 dark:bg-gray-900">
    <router-link to="/GameStart" class="mb-1">
      <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style="width: 16px"
          fill="#fff"
          viewBox="0 0 24 24"
        >
          <title>arrow-left</title>
          <path
            d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
          />
        </svg>
      </Button>
    </router-link>

    <div class="pl-4 pt-4">
      <HistoryLine
        :array="historyLine"
        :witchQr="false"
        :bigFonts="true"
        :active="pickedUsers"
        @update:clickOnItem="openModalChoosePlayer"
      />
      <vs-dialog
        modal
        :visible="showModalChoosePlayer"
        @update:visible="(v) => (showModalChoosePlayer = v)"
      >
        <template #header>
          <h4 class="not-margin text-white">
            Выберите Игрока для номера {{ roleFor }}
          </h4>
        </template>

        <div class="flex justify-center mb-8">
          <Button @click="clearPlayer(roleFor)"> очистить игрока </Button>
        </div>

        <div
          :key="JSON.stringify(restGlobalPlayers) + roleFor"
          class="text-white max-h-screen"
          style="padding-bottom: 100px"
        >
          <div
            v-for="user in restGlobalPlayers"
            :key="'takeRoles-card-' + user.name"
            class="cursor-pointer card"
            @click="choosePlayer(user.id)"
          >
            {{ user.name }} -- {{ user.telegram }}
          </div>
        </div>
      </vs-dialog>
    </div>
    <div class="flex items-center gap-4">
      <Button :disabled="!allRolesAssigned" @click="startChoosingRoles">
        Игроки назначены, далее
      </Button>
    </div>
    <div
      v-if="Object.keys(players).length !== roles.length"
      style="font-size: 12px"
      class="pl-2 pt-1 opacity-50"
    >
      Что бы продолжить вам нужно заполнить все роли игроков.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import cards, { getByNames } from "@/store/cards.ts";
import HistoryLine from "@/components/Game/HistoryLine.vue";
import { arrayStartGameTakeCards } from "@/js/GameModData.ts";
import CardSafe from "@/components/Card.vue";
import mirImg from "@/assets/mir.png";
import witchImg from "@/assets/witch.png";
import GameMod from "@/js/GameMod";
import { toast } from "vue3-toastify";

const PLAYERS_KEY = "players";

const router = useRouter();
const players = ref({});
const showModalChoosePlayer = ref(false);
const roleFor = ref(null);
const historyLine = ref([]);
const roles = ref([]);
const pickedUsers = ref([]);

const globalPlayers = ref([]);

async function fetchGlobalPlayers() {
  try {
    const response = await fetch(`/api/sheets/players`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    globalPlayers.value = data.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Failed to fetch global players:", error);
  }
}

const restGlobalPlayers = computed(() => {
  return globalPlayers.value.filter(
    (el) =>
      !Object.values(players.value).some(
        (player) => player.telegram === el.telegram
      )
  );
});

const allRolesAssigned = computed(() => {
  return Object.keys(players.value).length === roles.value.length;
});

const save = () => {
  historyLine.value = arrayStartGameTakeCards(
    roles.value.length,
    players.value
  );
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(players.value));
};

const clear = () => {
  players.value = {};
  save();
};

const openModalChoosePlayer = (id) => {
  console.log("id", id);
  roleFor.value = id;
  showModalChoosePlayer.value = true;
};

const choosePlayer = (id) => {
  const player = globalPlayers.value.find((el) => el.id === id);

  if (pickedUsers.value.length < roles.value.length) {
    players.value[roleFor.value] = {
      ...players.value[roleFor.value],
      ...player,
      id: player.id,
      name: `Игрок ${player.name}, tg ${player.telegram}`,
    };
    pickedUsers.value.push(id);
    save();
    showModalChoosePlayer.value = false;
  } else {
    toast.error("Все роли уже назначены!");
  }
};

const clearPlayer = (id) => {
  players.value[id] = {};
  pickedUsers.value = pickedUsers.value.filter((el) => el !== id);
  save();
  showModalChoosePlayer.value = false;
};

const startChoosingRoles = () => {
  if (allRolesAssigned.value) {
    save();
    localStorage.setItem("players", JSON.stringify(players.value));
    router.push("/GameComming");
  } else {
    toast.error("Не все роли назначены!");
  }
};

onMounted(() => {
  fetchGlobalPlayers();

  let storedRoles = localStorage.getItem("gameRoles");
  let storedPlayers = localStorage.getItem(PLAYERS_KEY);

  if (storedRoles) {
    storedRoles = JSON.parse(storedRoles);
  }
  if (storedPlayers) {
    storedPlayers = JSON.parse(storedPlayers);
  }

  players.value = storedPlayers || {};
  roles.value = Array.isArray(storedRoles) ? storedRoles : [];

  historyLine.value = arrayStartGameTakeCards(
    roles.value.length,
    players.value
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth",
    block: "start",
  });
});
</script>

<style scoped>
.card {
  padding: 10px;
  margin: 5px 0;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s ease;
}

.card:hover {
  background-color: #444;
}

@media (min-width: 768px) {
  .card {
    padding: 15px;
    margin: 10px 0;
  }
}

@media (min-width: 1024px) {
  .card {
    padding: 20px;
    margin: 15px 0;
  }
}
</style>
