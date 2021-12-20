
export default (context, inject) => {

  const generateAnomalyColor = (value) => {
    
    if (!value) {
      return '#ffffff'
    }
    else if (value < 0) {
      return value < -0.35  ? '#000233' :
        value < -0.3 ? '#000570' :
        value < -0.25 ? '#0008ad' :
        value < -0.2 ? '#000beb' :
        value < -0.1 ? '#525aff' :
        '#8f94ff' ;
  } else {
    return value > 0.5  ? '#440803' :
          value > 0.4 ? '#921107' :
          value > 0.3 ? '#cc180a' :
          value > 0.2 ? '#f42f20' :
          value > 0.1 ? '#f42f20' :
          '#f98981' ;
    }
  }

  const generateColorNoAnomaly = (value) => {
    return value > 0.9  ? '#338556' :
        value > 0.8 ? '#4FBA19' :
        value > 0.7 ? '#8CDD20' :
        value > 0.6 ? '#B8E222' :
        value > 0.5 ? '#E5FC27' :
        value > 0.4 ? '#FFF73F' :
        value > 0.3 ? '#FBD521' :
        value > 0.2 ? '#F4811F' :
        value > 0.1 ? '#F0340A' :
        value > 0 ? '#BC2505' 
        : '#800000';
  }
  inject('colors', { generateAnomalyColor, generateColorNoAnomaly });
}