<template>
   <div>
    <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        :interval="3000"
        indicators
        img-width="1024"
        img-height="360"
    >
        <b-carousel-slide
        caption="Procesamiento de Lácteos"
        img-src="@/images/img_1.png"
        ></b-carousel-slide>
        <b-carousel-slide
        caption="Exhibición de bebidas industriales"
        img-src="@/images/img_2.png"
        ></b-carousel-slide>
        <b-carousel-slide
        caption="Capacitación de Docentes"
        img-src="@/images/img_3.jpg"
        ></b-carousel-slide>
        <b-carousel-slide
        caption="Resultados de Panificación"
        img-src="@/images/img_4.jpg"
        ></b-carousel-slide>
    </b-carousel>
</div>
</template>

<script>
  export default {

  }
</script>