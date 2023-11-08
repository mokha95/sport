export { Layout };
// le layout prend addContact en enfant
function Layout({ children }) {
  return (
    <div className="p-4">
      <div className="container">{children}</div>
    </div>
  );
}
