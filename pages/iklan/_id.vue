<template></template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'iklan',
  data: () => ({
    hits: [],
  }),
  computed: {
    ...mapGetters({
      productid: 'product/productid',
    }),
  },
  methods: {
    ...mapActions({
      setProductId: 'product/setProduct',
    }),
    async getDtlIklan() {
      await this.$axios
        .get('/search/v3/search', {
          params: {
            id: this.$route.params.id,
            limit: 1,
          },
        })
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.hits = hits[0]._source
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    await this.getDtlIklan()
    await this.setProductId(this.hits.id)
    await this.$router.push(
      '/detail-iklan/' + this.hits.judul.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+this.productid
    )
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.hits.judul,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.hits.deskripsi,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.getImage(this.hits.photo),
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.hits.judul,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.hits.judul,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.hits.deskripsi,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.getImage(this.hits.photo),
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.getImage(this.hits.photo),
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.hits.judul,
        },
      ],
    }
  },
}
</script>

<style>
</style>