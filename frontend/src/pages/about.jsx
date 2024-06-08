import React from 'react';
import '../fichiercss/about/about.css'; 

function About() {
  return ( <> <br /> <br /> <br /> <br /> <br />
    <html> 
        <head>  
            <title>A propos AgriCOOL</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        </head> <body>
       <div className="about"> <br /> <br /> <br /> <br />
        <h1>Qui est AgriCOOL ?</h1>
        <img id='logopicture' src={require('./pics/logo.png')} alt='logo' />
         <h2 id='bqqn'>Bienvenue sur AgriCOOL, la plateforme agricole qui vous facilite la vie !</h2> <br /> <br />
              <p id='wlcm'>Trouvez rapidement ce dont vous avez besoin, que ce soit des terrains, <br />
                des produits agricoles ou des conseils pratiques. <br />
                 Rejoignez-nous dès maintenant et faites partie de notre communauté florissante !</p> <br />
               <h2 id='expl'>En exploitant notre plateforme, vous avez la faculté <br />
                de commercialiser vos produits agricoles à tout instant et à une clientèle diversifiée.
               </h2> <br /> <br />
             </div> <br /> <br /> <br />
             <div className='tasks'>
              <h1>Utiliser AgriCOOL en tant que Agriculteur !</h1> <br /> <br /> <br /> <br />
              <img id='i1' src={require('./pics/m4.jpg')} alt='products' /> <br /> <br />
               <h2 id='p1'>
               Grâce à notre plateforme, vous avez la possibilité de commercialiser <br />
                une vaste gamme de produits agricoles auprès de nombreux commerçants. 
                Vous pouvez ainsi toucher un large public d'acheteurs potentiels.
               </h2> <br /> <br /> <br /> <br /> <br />
               <img id='i2' src={require('./pics/mpc.png')} alt='products' /> <br /> <br /> 
                <h2 id='p2'>
                Avec AgriCOOL, vous pouvez acheter vendre et/ou louer des terres agricoles, <br />
                optimiser vos pratiques de production et développer vos activités agricoles
                </h2> <br /> <br /> <br /> <br /> <br /> <br />
                <img id='i1' src={require('./pics/exp.jpg')} alt='products' /> <br /> <br /> <br />
                <h2 id='p3'>
                En utilisant AgriCOOL, vous pouvez partager votre expérience agricole avec d'autres agriculteurs, obtenir leurs opinions et bénéficier de leurs conseils. <br />
                 De plus, vous avez accès aux expériences d'autres agriculteurs, <br />
                 ce qui vous permet d'obtenir des conseils et des réponses à vos questions. <br />
                </h2> <br /> <br /> <br /> <br />
                <img id='i2' src={require('./pics/m3.jpg')} alt='communiquer'/> <br /> <br /> <br />
                <h2 id='p4'>
                Optimisez les échanges commerciaux en établissant une communication directe avec vos clients, <br />
                 ce qui facilitera grandement les transactions. <br />
                </h2> <br /> <br /> <br /> <br /> <br />
             </div> <br /> <br /> <br />
             <div className='tasks'>
              <h1>Utiliser AgriCOOL en tant que Commerçant !</h1> <br /> <br />
              <img id='i1' src={require('./pics/m2.jpg')} alt='commerçant' /> <br /> <br />
              <h2 id='p5'>
              Sur notre plateforme, vous avez accès à une vaste gamme de produits <br />
              directement proposés par les agriculteurs, ce qui peut stimuler <br />
               votre activité commerciale en facilitant les achats.
              </h2> <br /> <br /> <br /> <br />
              <img id='i2' src={require('./pics/m1.jpg')} alt='commu' /> <br /> <br />
            <h2 id='p6'>
            En utilisant AgriCOOL, vous pouvez communiquer avec tous les agriculteurs <br />
             et négocier tous les détails des offres.
            </h2> <br /> <br /> <br /> <br /> <br /> <br /> <br />
           </div> <br /> <br /> 
           <div className='tasks'>
          <h1> Contacter nous maintenant !</h1> <br /> <br />
          <div id='fbcontact'>
          <a href="https://www.facebook.com/" class="fa fa-facebook" />
          <h1> Contater nous <br /> sur facebook  ! </h1>
          </div> 
          <div id='gmcontact'>
          <a href="https://www.gmail.com/" class="fa fa-google"/>
          <h1> Contater nous <br /> par e-mail  ! </h1>
          </div> 
          <div id='linkedincontact'>
          <a href="https://www.linkedin.com/" class="fa fa-linkedin" />
                    <h1> Contater nous <br /> sur LinkedIn  ! </h1>
          </div>
          <br /> <br /> 
           </div> <br /> <br />  
        </body> 
    </html> </>
  );
}

export default About;
