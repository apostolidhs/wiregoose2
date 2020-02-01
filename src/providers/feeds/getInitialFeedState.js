export default (id = null) => ({
  loading: false,
  loaded: false,
  id,

  articleLoaded: false,
  articleLoading: false,
  articleContent: [],
  articleError: null,
  articleCreatedAt: null,

  relatedLoaded: false,
  relatedLoading: false,
  relatedIds: []
});
