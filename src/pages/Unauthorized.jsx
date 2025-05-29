function Unauthorized() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-red-600">403 - Access Denied</h1>
      <p className="mt-4">You do not have permission to view this page.</p>
    </div>
  );
}

export default Unauthorized;
