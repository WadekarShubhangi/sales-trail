import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import SalesContext from "../../contexts/SalesContext";
import SidebarNav from "../../components/SidebarNav/SidebarNav";
import Header from "../../components/Header/Header";
import useFetch from "../../useFetch";

const LeadDetails = () => {
  const { leadId } = useParams();
  console.log(leadId)

  const {
    leadData,
    closeSideBar,
    handleCommentSubmit,
    commentFormData,
    handleCommentChange,
  } = useContext(SalesContext);
  const selectedLead = leadData?.leads?.find((lead) => lead._id === leadId);

  const {
    data: commentData,
    loading: commentLoading,
    error: commentError,
    refetch: commentRefetch,
  } = useFetch(`https://sales-trail.vercel.app/leads/${leadId}/comments`);

  if (!selectedLead) {
    return <p>Loading lead details...</p>;
  }
  return (
    <>
      <main className="d-flex crm-dashboard">
        <aside className={`section-sidebar ${closeSideBar ? "open" : ""}`}>
          <SidebarNav />
        </aside>
        <div className="container my-3">
          <Header title="Lead Details" />
          <div className="card">
            <h3 className="card-header">{selectedLead?.name}</h3>
            <div className="card-body">
              <h5 className="card-title">{selectedLead.salesAgent.name}</h5>
              <p className="card-text">
                <strong>Source:</strong> {selectedLead.source}
              </p>
              <p className="card-text">
                <strong> Status: </strong> {selectedLead.status}
              </p>
              <p className="card-text">
                <strong> Priority:</strong> {selectedLead.priority}
              </p>
              <p className="card-text">
                <strong> Time to close:</strong> {selectedLead.timeToClose}
              </p>
              <Link className="btn btn-primary" to={`/leads/${leadId}/edit`}>
                Edit Lead
              </Link>
            </div>
          </div>

          <section className="my-3">
            <Header title="Comments" />
            {commentLoading && <p>Loading comments...</p>}
            {commentError && <p>Error loading comments</p>}
            {commentData?.comments?.length > 0 ? (
              commentData?.comments.map((comment) => (
                <div key={comment._id} className="border p-2 mb-2 rounded">
                  <p>
                    <strong>
                      {comment.author.name} -{" "}
                      {new Date(comment.createdAt).toLocaleString()}
                    </strong>
                  </p>
                  <p>
                    <strong>Comment : </strong>
                    {comment.commentText}
                  </p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}

            <form
              action=""
              onSubmit={(e) =>
                handleCommentSubmit(
                  e,
                  leadId,
                  selectedLead.salesAgent._id,
                  commentRefetch
                )
              }
            >
              <label className="form-label fw-semibold">Name:</label>

              <input
                type="text"
                placeholder="Add New Comment"
                name="commentText"
                className="form-control my-2"
                value={commentFormData.commentText}
                onChange={handleCommentChange}
                required
              />
              <button className="btn btn-primary">Add Comment</button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
};
export default LeadDetails;
