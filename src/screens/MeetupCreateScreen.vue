<template>
  <KeyboardAvoidingView 
  class=".keyboard-container"
  :style="{flex:1, padding: 10}" behavior="padding" enabled keyboardVerticalOffset="23">
    <nb-container>
      <!-- Provide Navigation to App Header -->
      <AppHeader :navigation="navigation" />
      <!-- Provide Styles Here -->
      <view :style="styles.container">
        <nb-text :style="styles.headerOne">Create Meetup</nb-text>
      </view>
      <nb-content>
        <nb-form>
          <nb-item stackedLabel class="no-margin">
            <nb-label>Location</nb-label>
            <nb-input v-model="form.location" />
          </nb-item>
          <nb-item stackedLabel class="no-margin">
            <nb-label>Title</nb-label>
            <nb-input v-model="form.title" />
          </nb-item>
          <nb-item stackedLabel class="no-margin">
            <nb-label>Start Date</nb-label>
            <view :style="inpuStyle">
              <nb-date-picker
                :defaultDate="defaultDate"
                :minimumDate="minimumDate"
                :maximumDate="maximumDate"
                :modalTransparent="false"
                animationType="fade"
                androidMode="default"
                placeHolderText="Select date"
                :textStyle="{ color: 'black' }"
                :placeHolderTextStyle="{ color: '#d3d3d3' }"
                :onDateChange="setDate"
              />
            </view>
          </nb-item>
          <nb-item stackedLabel class="no-margin">
            <nb-label>Time From</nb-label>
            <AppTimePicker :interval="30" :onValueChange="(time)=>setTime(time, 'timeFrom')">

            </AppTimePicker>
          </nb-item>
          <nb-item stackedLabel class="no-margin">
            <nb-label>Time To</nb-label>
            <AppTimePicker :interval="30" :onValueChange="(time)=>setTime(time, 'timeTo')">

            </AppTimePicker>
          </nb-item>
          <nb-item stackedLabel class="no-margin">
            <nb-label>Category</nb-label>
            <view
              :style="inpuStyle"
            >
              <nb-picker
                mode="dropdown"
                placeholder="Select Category"
                placeholderIconColor="#007aff"
                :selectedValue="selectedValue"
                :onValueChange="onCategoryChange"
              >
                <nb-item
                  v-for="category in categories"
                  :key="category._id"
                  :label="category.name"
                  :value="category"
                />
              </nb-picker>
            </view>
          </nb-item>
          <nb-item stackedLabel class="no-margin">
            <nb-label>Image</nb-label>
            <nb-input v-model="form.image" />
          </nb-item>
          <nb-item stackedLabel class="no-margin">
            <nb-label>Description</nb-label>
            <nb-textarea :rowSpan="3" bordered v-model="form.description"
            :style="{width: '100%'}" />
          </nb-item>
          <nb-item stackedLabel class="no-margin">
            <nb-label>Additional Info</nb-label>
            <nb-input v-model="form.shortInfo" />
          </nb-item>
          <nb-button :on-press="createMeetup" block>
            <nb-text>Create Meetup</nb-text>
          </nb-button>
        </nb-form>
      </nb-content>
    </nb-container>
  </KeyboardAvoidingView>
</template>

<script>
import styles from "@/styles";
import { KeyboardAvoidingView } from "react-native";
import moment from 'moment'
export default {
  components: {
    KeyboardAvoidingView
  },
  props: {
    navigation: {
      type: Object
    }
  },
  data() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const day = today.getDate()
    const maximumDate = new Date(year+1, month, day)
    return {
      defaultDate: today,
      minimumDate: today,
      maximumDate: maximumDate,
      styles,
      form: {
        location: null,
        title: null,
        startDate: null,
        category: null,
        image: null,
        shortInfo: null,
        description: null,
        timeTo: null,
        timeFrom: null
      },
      inpuStyle: {
        flex: 1,
        alignSelf: "stretch",
        paddingLeft: null,
        marginLeft: null,
        height: 50
      }
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.items;
    },
    selectedValue() {
      return this.form.category; // || (this.categories[0] && this.hasCategories)
    },
    hasCategories() {
      return this.categories && this.categories.length > 0;
    }
  },
  methods: {
    createMeetup() {
      this.$store.dispatch('meetups/createMeetup', this.form)
      .then((createdMeetup)=> {
        this.navigation.navigate('Meetup',{meetupId: createdMeetup._id})
      })
    },
    onCategoryChange(category) {
      this.form.category = category;
    },
    setDate(date){
      this.form.startDate = moment(date).format()
    },
    setTime(time, label){
      this.form[label] = time
    }
  },
  created() {
    this.$store.dispatch("categories/fetchCategories");
  }
};
</script>
<style scoped>
.no-margin{
  margin-left: 0;
}
.keyboard-container{
  padding: 0 10px
}
  
</style>