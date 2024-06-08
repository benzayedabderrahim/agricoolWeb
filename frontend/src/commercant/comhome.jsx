import React, { useEffect, useState } from 'react';
import './components/css/home.css';
import 'animate.css/animate.min.css'; 
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Navigation from './components/naviagtionbar';

function Comhome() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      console.log("ID de l'utilisateur depuis le stockage :", storedUserId);
      setUserId(storedUserId);
    }
  }, []);

  console.log("ID de l'utilisateur dans l'état :", userId);
  return (
    <div>
      <Navigation userId={userId} /> <br /> <br />
      <div className='home'>
        <Container className="welcome-container py-5 text-center">
          <h1 className="mb-4 animate__animated animate__fadeInDown display-2 fw-bold text-uppercase">Bienvenue à AgriCOOL !</h1>
          <p className="lead animate__animated animate__fadeInUp fs-4">Votre destination unique pour tout ce qui concerne l'agriculture !</p>
        </Container>
        <Container>
          <Row className="mb-5"> 
            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={require('./img/m2.jpg')} alt="Produit" />
                <Card.Body>
                  <Card.Title className="h4 fw-bold text-uppercase mb-3">Partager votre expérience et consulter les expériences d'autres agriculteurs !</Card.Title>
                  <Card.Text>Découvrez les diverses expériences des agriculteurs. Et partagez aussi vos histoires !</Card.Text>
                  <Button href='/post' className="btn btn-primary mt-3">Consulter maintenant !</Button>
                </Card.Body>
              </Card>
            </Col>    
            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={require('./img/vente.png')} alt="Produit" />
                <Card.Body>
                  <Card.Title className="h4 fw-bold text-uppercase mb-3">Vendez vos produits agricoles en ligne !</Card.Title>
                  <Card.Text>Il y a des commerçants qui pourraient être attirés par vos produits !</Card.Text>
                  <Button href='/listedeproduits' className="btn btn-primary mt-3">Consulter maintenant !</Button>
                </Card.Body>
              </Card>
            </Col>       
          </Row>
        </Container>
        <footer>
          <img src={require('./img/logo.png')} alt="Logo de AgriCOOL" className="img-fluid mb-3" />
          <p className="lead">Contactez-nous à info@agricool.com</p>
        </footer>
      </div>
    </div>
  );
}

export default Comhome;
