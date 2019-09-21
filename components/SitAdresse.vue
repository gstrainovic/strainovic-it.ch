<template>
  <div>
    <p>
      Strainovic IT<br />
      Strainovic Goran<br />
      Bahnstrasse 9b<br />
      CH 9323 Steinach<br />
      {{ $t('kanton-st-gallen') }}<br />
      {{ $t('schweiz') }}<br />
    </p>

    <base-button
      class="mb-3"
      size="sm"
      type="primary"
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.google.com/maps/place/Strainovic+IT/@47.5008767,9.4411352,17z/data=!3m1!4b1!4m5!3m4!1s0x479b1cf2d3e32e4f:0xb09b276dcd03f76c!8m2!3d47.5008767!4d9.4433292?hl=de"
      ><i class="ni ni-square-pin"></i
      >{{ $t('auf-google-maps-anzeigen') }}</base-button
    >

    <p>
      <a href="tel:+41794117177">
        <i class="ni ni-mobile-button"></i> +41 79 411 71 77<br />
      </a>
    </p>
    <p>
      <a href="mailto:info@strainovic-it.ch">
        <i class="ni ni-email-83"></i> info@strainovic-it.ch</a
      >
    </p>
  </div>
</template>
