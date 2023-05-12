import React, { useEffect, useState } from "react";

export default function Loader() {
    return (
        <div className="d-flex justify-content-center mt-3">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    );
}
