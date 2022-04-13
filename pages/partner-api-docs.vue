<template>
  <div style="min-height:90vh">

    <div class="container">
      <div class="container news-page-top">
        <h1>Partner integration docs</h1>
      </div>
    </div>

    <div class="container p20">
      <h4 class="title">
        Интеграция с мониторингом
      </h4>
      <div>
        <b>Как получить Реферальная ссылка</b>
        <p>
          Чтобы получить вашу партнерскую ссылку вам необходимо войти в свой аккаунт используя email и пароль затем
          перейти в "Профиль" раздел "Партнерская программа" и ниже расположена "Ваша партнерская ссылка".
        </p>
        <br />
        <center>
          <img src="~/assets/img/partner-url.png" style="max-width: 900px" />
        </center>
        <br />
        <br />
        <b>
          Обменный пункт может принимать GET-параметры cur_from и cur_to, передаваемые с мониторинга в момент перехода
          пользователя по ссылке на сайт обменника.
        </b>
        <br />
        <br />
        <p>
          При переходе пользователя с мониторинга, в URL сайта обменника могут быть добавлены GET-параметры cur_from и
          cur_to со значениями выбранных пользователем валют. В качестве названий валют используются короткие буквенные
          коды. Эти данные необходимо использовать для перенаправления пользователя на страницу направления обмена,
          выбранного пользователем ранее в мониторинге, либо для автоматической подстановки выбранных валют в списки
          выбора.
          <br />
          Пример ссылки с параметрами: <b>{{ $rest.baseUrl }}/ref/XXXXXX/?cur_from=PMUSD&cur_to=BTC</b>
        </p>
      </div>
      <br />
      <br />
      <b>Ссылки на экспорт курсов:</b>
      <br />
      <br />
      <div>
        <b>XML</b>
        <p>{{ $rest.servicePath }}/export/xml</p>
        <b>JSON</b>
        <p>{{ $rest.servicePath }}/export/json</p>
        <b>TXT</b>
        <p>{{ $rest.servicePath }}/export/txt</p>
      </div>
    </div>
    <div class="container p20">
      <h4 class="title">
        АПИ для партнёров
      </h4>
      <b>Как получить API-key?</b>
      <br />
      <br />
      <p>
        Чтобы получить вашу партнерскую ссылку вам необходимо войти в свой аккаунт используя email и пароль затем
        перейти в "Профиль" раздел "API" и нажать на кнопку "Создать API доступ" после скопировать данные которые
        появятся ниже там будет ваш API key.
      </p>
      <br />
      <center>
        <img src="~/assets/img/get-api-key.png" style="max-height: 400px;" />
      </center>

      <b>
        Адрес запросов:
      </b>
      <br />
      <br />
      <p>
        URL: {{ $rest.servicePath }}/partner/api.php
        <br />
        <br />
        <b>Передаваемые GET параметрами:</b> <br /><br />
        <code>api_action</code> – pp <br />
        <code>api_key</code> – ваш личный ключ <br />
        <code>method</code> – метод АПИ модуля
        <br />
        <br />
        Ссылка на АПИ будет выглядеть приблизительно следующим образом:<br />
        <code>{{ $rest.servicePath }}/partner/api.php?api_action=pp&api_key={api_key}&method={method}</code>
      </p>


      <br />
      <hr />
      <p><b>get_info</b> - информация об аккаунте и платежных методах</p>
      <h5>Параметры:</h5>
      <div class="table__param" style="border: 1px solid;padding: 5px;margin: 10px">
        <table>
          <thead>
            <tr style="font-weight: bold;">
              <td width="200px">Name</td>
              <td width="100px">Type</td>
              <td width="100px">Required</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4">
                Дополнительные параметры не принимаются
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5>Результат:</h5>
      <pre>
{
  status: "success",
  error: 0,
  error_text: "",
  data: {
    balance: 15,
    totalReceived: 0,
    link: "test",
    min_payout: 99999999,
    items: { },
  },
}
      </pre>
      <br />
      <hr />
      <p><b>get_exchanges</b> - ваши партнерские обмены</p>
      <h5>Параметры:</h5>
      <div class="table__param" style="border: 1px solid;padding: 5px;margin: 10px">
        <table>
          <thead>
            <tr style="font-weight: bold;">
              <td width="200px">Name</td>
              <td width="100px">Type</td>
              <td width="100px">Required</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                start_time
              </td>
              <td>
                Integer
              </td>
              <td>
                No
              </td>
              <td>
                время, с которого выводить данные (unix)
              </td>
            </tr>
            <tr>
              <td>
                end_time
              </td>
              <td>
                Integer
              </td>
              <td>
                No
              </td>
              <td>
                время, до которого выводить данные (unix)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5>Результат:</h5>
      <pre>
{
  status: "success",
  error: 0,
  error_text: "",
  data: {
    items: {
      1895: {
        id: 1895,
        time: 1590356264,
        date: "2020-05-24 21:37:44",
        course_give: 0,
        course_get: 241.57,
        amount_give: 0,
        amount_get: 241.57,
        exchange_success: 1,
        accrued: 1,
        partner_reward: 0,
        user_hash: "1r7",
      }
    }
  }
}
      </pre>
      <br />
      <hr />
      <p><b>get_links</b> - партнерские переходы</p>
      <h5>Параметры:</h5>
      <div class="table__param" style="border: 1px solid;padding: 5px;margin: 10px">
        <table>
          <thead>
            <tr style="font-weight: bold;">
              <td width="200px">Name</td>
              <td width="100px">Type</td>
              <td width="100px">Required</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                start_time
              </td>
              <td>
                Integer
              </td>
              <td>
                No
              </td>
              <td>
                время, с которого выводить данные (unix)
              </td>
            </tr>
            <tr>
              <td>
                end_time
              </td>
              <td>
                Integer
              </td>
              <td>
                No
              </td>
              <td>
                время, до которого выводить данные (unix)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5>Результат:</h5>

      <pre>
{
  status: "success",
  error: 0,
  error_text: "",
  data: {
    items: {
      1631577600: {
        id: 1631577600,
        time: 1631577600,
        date: "2021-09-14 00:00:00",
        browser: "Unknown",
        ip: "0.0.0.0",
        referrer: "",
        user_hash: "613fe600",
        query_string: ""
      }
    }
  }
}
      </pre>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
table {
  width: 100%;
}
</style>
