<template>
    <div>
        <carousel></carousel>
        <BookShelf></BookShelf>
    </div>
</template>

<script>
    import Carousel from "@/components/Carousel";
    import BookShelf from "@/components/BookShelf";
    export default {
        name: "HomePage",
        components: {BookShelf, Carousel}
    }
</script>

<style scoped>

</style>