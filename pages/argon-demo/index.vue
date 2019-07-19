<template>
  <div>
    <Hero></Hero>
    <BasicElements></BasicElements>
    <Inputs></Inputs>
    <CustomControls></CustomControls>
    <Navigation></Navigation>
    <JavascriptComponents></JavascriptComponents>
    <Icons></Icons>
    <Examples></Examples>
    <DownloadSection></DownloadSection>
    <Carousel></Carousel>
  </div>
</template>
<script>
import Hero from '~/components/argon-demo/Hero'
import BasicElements from '~/components/argon-demo/BasicElements'
import Inputs from '~/components/argon-demo/Inputs'
import CustomControls from '~/components/argon-demo/CustomControls'
import Navigation from '~/components/argon-demo/Navigation'
import JavascriptComponents from '~/components/argon-demo/JavascriptComponents'
import Carousel from '~/components/argon-demo/Carousel'
import Icons from '~/components/argon-demo/Icons'
import Examples from '~/components/argon-demo/Examples'
import DownloadSection from '~/components/argon-demo/DownloadSection'

export default {
  name: 'Components',
  layout: 'argon-demo',
  components: {
    Hero,
    BasicElements,
    Inputs,
    CustomControls,
    Navigation,
    JavascriptComponents,
    Carousel,
    Icons,
    Examples,
    DownloadSection
  }
}
</script>
