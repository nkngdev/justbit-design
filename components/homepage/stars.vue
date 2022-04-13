<!---->
<template>
  <div class="services text-center">
    <h2 class="title" v-html="$t('page.main.stars.title')"></h2>

    <ul>
      <li>
        <div class="text-center">
          <span><img src="~assets/img/like.svg" alt=""/></span>
          <p>
            <b>{{ $t("page.main.stars.guarantee_t") }}</b>
          </p>
          <div class="services-txt">{{ $t("page.main.stars.guarantee") }}</div>
        </div>
      </li>
      <li>
        <div class="text-center">
          <span><img src="~assets/img/credit-card.svg" alt=""/></span>
          <p>
            <b>{{ $t("page.main.stars.privacy_t") }}</b>
          </p>
          <div class="services-txt">{{ $t("page.main.stars.privacy") }}</div>
        </div>
      </li>
      <li>
        <div class="text-center">
          <span><img src="~assets/img/telephone.svg" alt=""/></span>
          <p>
            <b>{{ $t("page.main.stars.support_t") }}</b>
          </p>
          <div class="services-txt">{{ $t("page.main.stars.support") }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
