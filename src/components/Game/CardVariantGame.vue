<template>
  <div>
    <div class="cardVariantGame">
      <div class="cardVariantGame__title mb-2">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
      <div class="cardVariantGame__roles">
        <div v-for="(role, index) in rolesList" :key="index"
             class="cardVariantGame__roles__item"
        >
          <div class="cardVariantGame__roles__item__img" :class="index >= playersLength ? 'disabled' : ''">
            <img :src="role.ava" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  playersLength: Number,
  rolesList: [Array, Object],
})
</script>

<style scoped lang="scss">
.cardVariantGame{
  background: #1E1E1E;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  &__title{
    h3{
      font-size: 20px;
      line-height: 1.1;
      color: #fff;
      margin-bottom: 5px;
    }
    p{
      font-size: 14px;
      line-height: 1.1;
      color: #fff;
      opacity: .5;
    }
  }
  &__roles{
    display: flex;
    flex-wrap: wrap;
    &__item{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin-right: -15px;

      &:last-child{
        margin-right: 0;
      }
      &__img{
        box-shadow: 0 0 5px #000;
        border: 2px solid rgba(103, 103, 222, 0.48);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        transition: .3s;
        &.disabled{
          opacity: 0.15;
        }
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &__title{
        h4{
          font-size: 16px;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 5px;
        }
        p{
          font-size: 12px;
          line-height: 1.1;
          color: #fff;
          opacity: .5;
        }
      }
    }
  }
}
</style>