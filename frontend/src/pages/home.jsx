import React, { useEffect, useState } from 'react';
import Navigation from '../components/navbar';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../fichiercss/home.css';
import 'animate.css/animate.min.css'; 

function Home() {
  const [userId, setUserId] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      console.log("User ID:", storedUserId);
      setUserId(storedUserId);
    }
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen); 
  };

  return (
    <div className='home'>
      <Navigation userId={userId} isOpen={!isNavOpen} toggleNav={toggleNav} />
      <Container className="welcome-container py-5 text-center">
        <h1 className="mb-4 animate__animated animate__fadeInDown display-2 fw-bold text-uppercase">Bienvenue à AgriCOOL !</h1>
        <p className="lead animate__animated animate__fadeInUp fs-4">Votre destination unique pour tout ce qui concerne l'agriculture !</p>
      </Container>
      <Container>
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={require('./pics/terrains.png')} alt="Produit" />
              <Card.Body>
                <Card.Title className="h4 fw-bold text-uppercase mb-3">Des offres des terrains</Card.Title>
                <Card.Text>Des terrains qui pourraient vous plaire !</Card.Text>
                <Button href='/listedeterrains' className="btn btn-primary mt-3">Consulter maintenant !</Button>
              </Card.Body>
            </Card>
          </Col>  
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={require('./pics/stories.png')} alt="Produit" />
              <Card.Body>
                <Card.Title className="h4 fw-bold text-uppercase mb-3">Partager votre expérience et consulter les expériences d'autres agriculteurs !</Card.Title>
                <Card.Text>Découvrez les diverses expériences des agriculteurs. Et partagez aussi vos histoires !</Card.Text>
                <Button href='/post' className="btn btn-primary mt-3">Consulter maintenant !</Button>
              </Card.Body>
            </Card>
          </Col>    
           <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={require('./pics/vpe.png')} alt="Produit" />
              <Card.Body>
                <Card.Title className="h4 fw-bold text-uppercase mb-3">Vendez vos produits agricoles en ligne !</Card.Title>
                <Card.Text>Il y a des commerçants qui pourraient être attirés par vos produits !</Card.Text>
                <Button href='/listedeterrains' className="btn btn-primary mt-3">Consulter maintenant !</Button>
              </Card.Body>
            </Card>
          </Col>   
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={require('./pics/comm.png')} alt="Produit" />
              <Card.Body>
                <Card.Title className="h4 fw-bold text-uppercase mb-3">Communiquer avec le monde !</Card.Title>
                <Card.Text> Discuter avec vos acheteurs et négocier tous les détails de vente !</Card.Text>
                <Button href='/listedeterrains' className="btn btn-primary mt-3">Consulter maintenant !</Button>
              </Card.Body>
            </Card>
          </Col>        
        </Row>
      </Container>
      <footer>
        <img src={require('./pics/logo.png')} alt="Logo de AgriCOOL" className="img-fluid mb-3" />
        <p className="lead">Contactez-nous à info@agricool.com</p>
      </footer>
    </div>
  );
}

export default Home;
