export default (id = null) => ({
  id,
  loading: false,
  loaded: false,

  link: '',
  title: '',
  description: '',
  image: '',
  published: null,
  author: '',
  provider: '',
  lang: '',
  category: '',

  articleLoaded: false,
  articleLoading: false,
  articleContent: [],
  articleError: null,
  articleCreatedAt: null,

  relatedLoaded: false,
  relatedLoading: false,
  relatedIds: []
});
