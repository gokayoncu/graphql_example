import React from "react";
import { Layout, Button, Card } from "antd";
import style from "./style.module.css";
import {Link} from "react-router";

const { Header, Content } = Layout;

function Home() {
  return (
    <Layout className={style.layout}>
      <div className={style.header}>
        <h1>Giriş Sayfası</h1>
      </div>
      <Content className={style.content}>
        <Card className={style.card}>
        <h2>Hoş Geldiniz!</h2>
          <div className={style.features}>
            <p>
              <strong>Modern Takvim Arayüzü</strong> ile etkinliklerinizi kolayca yönetin
            </p>
            <p>
              <strong>Detaylı Etkinlik Yönetimi</strong> - Her etkinlik için özel notlar,
              konum bilgileri ve hatırlatıcılar ekleyin
            </p>
            <p>
              <strong>Programlı Takvim Görünümü</strong> - Haftalık, aylık ve yıllık
              görünüm seçenekleri ile etkinliklerinizi planlayın
            </p>
            <p>
              <strong>Çoklu Kullanıcı Desteği</strong> - Takvimlerinizi paylaşın ve
              işbirliği yapın
            </p>
            <p>
              <strong>Offline Destek</strong> - İnternet bağlantısı olmadan bile
              etkinliklerinizi görüntüleyin ve düzenleyin
            </p>
          </div>
          <Link to="/events" type="primary" size="large" className={style.button}>
            Başlayalım
          </Link>
        </Card>
      </Content>
    </Layout>
  );
}

export default Home;
