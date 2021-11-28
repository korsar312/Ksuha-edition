<template>
    <div class="wrap">
        <img :src="require(`../assets/${file.type === 'folder' ? 'OneDrive_Folder_Icon.svg' : 'Documents_icon.svg'}`)" class="image"/>
        <div class="title">
            {{file.name}}
        </div>
    </div>
</template>

<script>

    export default {
        name: "File",
        props:{
            file:{
                type: Object,
                default() {
                    return {}
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .image{
        height: 120px;
        border: none;
        overflow: hidden;
        transition: ease-in-out 0.2s;
    }
    .wrap{
        cursor: pointer;
        width: 150px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        overflow: hidden;
        &:hover{
            .image{
                transform:  scale(1.1);
            }
        }
    }


</style>