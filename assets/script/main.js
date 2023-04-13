const Display_scores = {
  init : function(){
    this.cache_selectors()
    console.log(this)
    this.get_scores(this.param.source).then(console.log)
  },

  cache_selectors : function(){
    this.$result_achieved = document.querySelector('#result_achieved')
    this.$score_reaction = document.querySelector('#score_reaction')
    this.$score_memory = document.querySelector('#score_memory')
    this.$score_verbal = document.querySelector('#score_verbal')
    this.$score_visual = document.querySelector('#score_visual')
  },

  get_scores : async function(source){
    return await fetch(source).then(response => response.json())
  },

  param: {
    source: '/assets/script/data.json',
  }
}
Display_scores.init()