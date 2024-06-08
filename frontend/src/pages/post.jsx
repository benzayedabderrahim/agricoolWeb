import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaExclamationTriangle, FaThumbsUp, FaComment, FaTrash } from 'react-icons/fa';
import '../fichiercss/publication.css';
import Navigation from '../components/navbar';

function Post() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [reportText, setReportText] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axios.get('http://localhost:3001/publication');
      setPublications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des publications :', error);
      setLoading(false);
    }
  };

  const handleReport = (postId) => {
    setSelectedPostId(postId);
  };

  const handleReportSubmit = async (postId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId || !reportText) {
        console.error('Données de signalement invalides');
        return;
      }

      await axios.post(`http://localhost:3001/publication/signal/${postId}`, {
        text: reportText,
        idAgriculteur: userId
      });

      setSelectedPostId(null);
      setReportText('');
      alert('Votre réclamation a été envoyée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du signalement :', error);
    }
  };

  const handleToggleLike = async (postId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User not logged in');
        return;
      }

      await axios.post('http://localhost:3001/likes/toggle', {
        idAgriculteur: userId,
        idPub: postId
      });

      fetchPublications();
    } catch (error) {
      console.error('Erreur lors du basculement du like :', error);
    }
  };

  const handlePostComment = async (postId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId || !commentText) {
        console.error('Données de commentaire invalides');
        alert('Le commentaire ne peut pas être vide !');
        return;
      }

      if (commentText.length < 1) {
        console.error('Le commentaire ne doit pas être vide');
        alert('Le commentaire ne peut pas être vide !');
        return;
      }

      await axios.post('http://localhost:3001/comments/create', {
        idAgriculteur: userId,
        idPub: postId,
        textComm: commentText
      });
      fetchPublications();
      setCommentText('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire :', error);
      alert('Une erreur s\'est produite lors de l\'ajout du commentaire. Veuillez réessayer plus tard.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3001/comments/delete/${commentId}`);
      fetchPublications();
      alert('Commentaire supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire :', error);
      alert('Une erreur s\'est produite lors de la suppression du commentaire');
    }
  };
  const handleCancelReport = () => {
    setSelectedPostId(null);
    setReportText('');
};

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <Navigation />
      <br /> <br /> <br />
      <div>
        <a href='/ajouterpost'>
          <button type="button" className="btn btn-success">Ajouter une publication !</button>
        </a>
      </div>
      <br /> <br /> <br />
      {publications.map((post) => (
        <div key={post.idPost} className="post">
          <FaExclamationTriangle className="report-icon" title="Signaler" onClick={() => handleReport(post.idPost)} />
          <div className="header">
            {post.Agriculteur && post.Agriculteur.photo && (
              <div className="avatar">
                <img src={`http://localhost:3001/uploads/${post.Agriculteur.photo}`} alt="Avatar" />
              </div>
            )}
            <div className="name">{post.Agriculteur && `${post.Agriculteur.nom} ${post.Agriculteur.prenom}`}</div>
          </div>
          <div className="title">{post.titre}</div>
          <div className="body">{post.pubText}</div>
          <div>
            {post.photo && <img className="post-photo" src={`http://localhost:3001/${post.photo}`} alt="Post" />}
            {post.video && <video className="post-media" src={`http://localhost:3001/${post.video}`} controls />}
          </div> <br /> <br />
          <div className="postund">
      <FaThumbsUp className="like-icon" title="Like" onClick={() => handleToggleLike(post.idPost)} />
      <span className="like-count">{post.likes?.length}</span>
      <div className="comment-section">
        <FaComment className="comment-icon" title="Comment" />
        <span className="comment-count">{post.comments?.length}</span>
      </div> 
    </div> <br /> <br />
          <div className="post-comments">
            {post.comments?.map((comment, index) => (
              <div key={index} className="comment">
                {comment.Agriculteur && comment.Agriculteur.photo && (
                  <div className="comment-header">
                    <div className="avatar">
                      <img src={`http://localhost:3001/uploads/${comment.Agriculteur.photo}`} alt="Avatar" />
                    </div>
                    <div className="name">{comment.Agriculteur.nom} {comment.Agriculteur.prenom}</div>
                  </div>
                )}
                <div className="comment-text">
                  {comment.Textréaction}
                  {comment.idAgriculteur === parseInt(localStorage.getItem('userId')) && (
                    <FaTrash className="delete-icon" onClick={() => handleDeleteComment(comment.idReaction)} />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="comments">
            <textarea
              placeholder="Ajoutez votre commentaire"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            ></textarea>
            <button onClick={() => handlePostComment(post.idPost)}>Ajouter Commentaire</button>
          </div>
          <div className="report">
            {selectedPostId === post.idPost && (
              <div>
                <textarea
                  placeholder="Entrez votre signalement ici"
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                ></textarea>
                <button onClick={() => handleReportSubmit(post.idPost)}>Envoyer le signalement</button>
                <button onClick={handleCancelReport} className="btn btn-secondary">Annuler</button>
                           </div>
                           )}
                           </div>
                           </div>
                           ))}
                           </div>
                           );
                           }

export default Post;
