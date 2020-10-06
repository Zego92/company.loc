<template>
    <v-app id="keep">
        <v-navigation-drawer v-model="drawer" app >
            <v-list-item two-line>
                <v-list-item-avatar color="primary" size="36">
                    <span class="white--text headline">A</span>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>Admin</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list dense>
                <v-list-item-group>
                    <v-list-item v-for="(item, i) in items" :key="i" :to="{name: item.routerName}" link class="text-decoration-none">
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{item.name}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <template v-slot:append>
                <div class="px-2 pb-2">
                    <v-btn text block @click="onClickLogout">
                        <v-icon left color="red">mdi-logout</v-icon>LogOut
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar app dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="outline: none !important"></v-app-bar-nav-icon>
            <v-toolbar-title>Панель Управления</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <transition name="fade" mode="out-in">
                <router-view/>
            </transition>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        props: [],
        name: "MainLayout",
        data() {
            return {
                drawer: null,
                items: [
                    {
                        name: 'Main',
                        icon: 'mdi-home',
                        routerName: 'Dashboard',

                    },
                    {
                        name: 'Employees',
                        icon: 'mdi-account-multiple',
                        routerName: 'Employees'
                    },
                    {
                        name: 'Companies',
                        icon: 'mdi-briefcase',
                        routerName: 'Companies'
                    },
                ],
            }
        },
        components: {},
        computed: {},
        watch: {},
        methods: {
            onClickLogout()
            {

            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translateX(2em);
    }
    .fade-enter-active, .fade-leave-active{
        transition: all .3s ease;
    }
</style>
