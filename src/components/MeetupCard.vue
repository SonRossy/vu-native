<template>
<nb-card>
      <nb-card-item bordered>
        <nb-left>
          <nb-thumbnail :source="{uri: meetup.meetupCreator.avatar}"></nb-thumbnail>
          <nb-body>
            <nb-text>{{meetup.title}}</nb-text>
            <nb-text note>{{meetup.startDate | formatDate}}</nb-text>
          </nb-body>
        </nb-left>
      </nb-card-item>
      <nb-card-item>
        <nb-body>
          <image :source="{uri: meetup.image}" 
          :style="stylesObj.cardItemImage" 
          class="card-item-image" />
          <nb-text>{{meetup.description}}</nb-text>
        </nb-body>
      </nb-card-item>
      <nb-card-item :style="{ paddingVertical: 0 }">
        <nb-left>
          <nb-button transparent>
            <nb-icon name="person"></nb-icon>
            <nb-text>{{meetup.joinedPeopleCount}}</nb-text>
          </nb-button>
        </nb-left>
        <nb-right>
          <nb-button :on-press=" () =>navigateToDetail(meetup._id)">
            <nb-text>Visit Meetup</nb-text>
          </nb-button>
        </nb-right>
      </nb-card-item>
    </nb-card>
</template>

<script>
export default {
  components: {},
  props: {
    meetup: {
      type: Object
    },
    navigateToDetail: {
        type: Function,
        required: true
    }
  },
  data() {
    return {
      title: "Home Screen",
      stylesObj: {
          cardItemImage: {
            resizeMode: "cover",
            width: '100%',
            marginBottom: 10
          }
        },
    }
  },

  methods: {

  }
};
</script>

<style>
  .card-item-image {
    flex: 1;
    height: 200;
    width: 100%;
  }

  .header-1 {
    font-size: 23px;
    padding: 20px;
    font-weight: bold;
  }
</style>
