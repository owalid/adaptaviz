<template>
  <v-col cols="12">
		<plotly :data="data" :layout="layout" :options="options"/>
	</v-col>
</template>
<script>
import { Plotly } from 'vue-plotly'

export default {
	name: "PiePlot",
	components: {
    Plotly
  },
  data() {
    return {
      data: [{
				values: [0, 20, 22, 23, 44, 55],
				type: 'pie'
      }],
      layout: {
				title: {
					text: "Title",
					font: {
						family: 'Courier New, monospace',
						size: 24,
						color: 'white'
					},
					xref: 'paper',
					x: 0.05
				},
				plot_bgcolor:'rgb(24, 24, 24)',
				paper_bgcolor:'rgb(24, 24, 24)',
				colorway: [
					'#99e2b4',
					'#78c6a3',
					'#56ab91',
					'#358f80',
					'#14746f',
					'#036666',
					'#012929',
					'#000e0e'	
				]
			},
			options: {}
    }
  }
}
</script>