<template>
    <div>
        <Hot></Hot>
        <AdminChart></AdminChart>
    </div>
</template>

<script>
    import Hot from "@/components/Hot";
    import AdminChart from "@/components/AdminChart";
    export default {
        name: "AdminHomePage",
        components: {AdminChart, Hot}
    }
</script>
