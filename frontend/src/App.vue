<script setup lang="ts">
import { onMounted, ref } from 'vue';


document.title = "Vite + Vue + ASP.NET Core";

interface WeatherForecast {
  date: string;
  temperatureC: number;
  summary: string;
}

const data = ref<WeatherForecast[]>([]);


  onMounted(async () => {
    data.value= await fetch('/api/weatherforecast')
      .then(res => res.json())
      .then( (res: WeatherForecast[]) => res);
  });

</script>

<template>
  <h1>You did it!</h1>
  <p>
    We are requesting data from the backend now.
  </p>

  <ul>
    <li v-for="item in data" :key="item.date">
      {{ item.date }} - {{ item.summary }} - {{ item.temperatureC }}°C
    </li>
  </ul>
</template>

<style scoped></style>
