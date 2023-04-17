const Display_scores = {
  
  init : function(){
    this.cache_selectors()
    this.set_attributes_list(this.params.source, this.$summary)
    this.set_overall_result(this.params.source)
  },

  cache_selectors : function(){
    this.$result_achieved = document.querySelector('#result_achieved')
    this.$summary = document.querySelector('#summary')
  },

  set_attributes_list : function (source, summary){
    this.get_attributes(source)
    .then(
      attributes => {
        let attributesList = ''
        attributes.forEach(attribute => {
          attributesList += this.write_attribute(attribute.category, attribute.score, attribute.icon)
        });
        return attributesList
      }
    )
    .then(
      attributesList => { summary.insertAdjacentHTML('afterend', attributesList) }
    )
  },

  set_overall_result : function(source){
    this.get_attributes(source)
    .then(
      attributes => { return attributes.map(attribute => attribute.score) }
    )
    .then(
      scores => { return scores.reduce(this.sum_scores) }
    )
    .then( 
      sumScores => { return this.percentage(sumScores, this.params.maxTotalScore) }
    )
    .then(
      result => { this.$result_achieved.innerHTML = result }
    )
  },

  get_attributes : async function(source){
    return await fetch(source).then(response => response.json())
  },

  write_attribute : function (category, score, icon){
    return `
      <article class="attribute ${category.toLowerCase()}">

        <div class="header">
          <img src="${icon}" alt="${category.toLowerCase()}-icon" class="attribute-icon">
          <h3 class="title">${category}</h3>
        </div>

        <p class="score"><strong class="achieved">${score}</strong> / 100</p>
      </article>
    `
  },

  sum_scores: function(total, score){
    return total + score
  },

  percentage : function(value, maxValue){
    return Math.round(value / maxValue * this.params.percent)
  },

  params: {
    source: './assets/script/data.json',
    maxTotalScore: 400,
    percent: 100,
  }
}

Display_scores.init()