<template>
<nb-container v-if="isMeetupLoaded">
    <AppHeader :navigation="navigation" screen="Meetup"/>
    <view :style="styles.container">
        <nb-h1 :style="[styles.headerOne]">{{meetup.title}}</nb-h1>
        <nb-thumbnail :source="{uri: meetupCreator.avatar}" />
        <nb-text :style="[styles.label]">
            by {{meetupCreator.name | upperCase}}
        </nb-text>
    </view>
    <nb-content>
        <nb-card>
            <nb-tabs>
                <nb-tab heading="Details">
                    <MeetupDetailInfo :meetup="meetup" />
                </nb-tab>
                <nb-tab heading="Threads">
                    <MeetupThreads :threads="threads" />
                </nb-tab>
                <nb-tab heading="Joined People">
                    <MeetupPeople :people="meetup.joinedPeople" />
                </nb-tab>
            </nb-tabs>

        </nb-card>
    </nb-content>
</nb-container>
</template>

<script>
import styles from '../styles/index'
import MeetupDetailInfo from '../components/MeetupDetailInfo'
import MeetupThreads from '../components/MeetupThreads'
import MeetupPeople from '../components/MeetupPeople'
export default {
    components: {
        MeetupDetailInfo,
        MeetupThreads,
        MeetupPeople,
    },
    props: {
        navigation: {
            type: Object
        }
    },
    data() {
        return {
            styles
        }
    },
    methods: {
        gotToScreen2() {
            this.navigation.navigate('Screen2') //Screen2 is the name of the screen to go to
        }
    },
    computed: {
        meetup() {
            return this.$store.state.meetups.item;
        },
        meetupCreator() {
            return this.meetup.meetupCreator || {}
        },
        category() {
            return this.meetup.category || {}
        },
        isMeetupLoaded() {
            return Object.keys(this.meetup).length > 0
        },
        threads() {
            return this.$store.state.threads.items
        }
    },
    created() {
        const meetupId = this.navigation.getParam('meetupId', 'none') // so you get a param like this from navigation object
        // which is sent by the component that you is navigating to this one
        this.$store.dispatch('meetups/fetchMeetupById', meetupId)
        this.$store.dispatch('threads/fetchThreads', meetupId)
    }
}
</script>

<style>

</style>
