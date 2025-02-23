import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import { Button, Card, message, Spin, Typography } from "antd";
import { acceptPayment } from "./api";

const { Text } = Typography;

export const SignAgreement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signatureRef = useRef<SignatureCanvas | null>(null);
  

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      message.error("Invalid or missing token.");
      navigate("/error");
    }
  }, [location, navigate]);

  const handleSubmit = async () => {
    if (!token) {
      message.error("No valid token found.");
      return;
    }

    const signaturePad = signatureRef.current;
    if (!signaturePad || signaturePad.isEmpty()) {
      message.warning("Please provide your signature before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const signatureBase64 = signaturePad.toDataURL("image/png");

      const response = await acceptPayment({
        token: token, // Token from URL
        signature: signatureBase64,
      });

      if (response) {
        message.success("Agreement successfully signed!");
        navigate("/success");
      } else {
        throw new Error("Failed to sign agreement.");
      }
    } catch (error) {
      message.error("Error submitting signature. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      title="Sign Your Rental Agreement"
      style={{ maxWidth: 500, margin: "auto", marginTop: 50, textAlign: "center" }}
    >
      <Text>Please sign below to confirm your rental agreement.</Text>
      <div style={{ border: "1px solid #ddd", marginTop: 20 }}>
        <SignatureCanvas 
          ref={signatureRef} 
          penColor="black"
          canvasProps={{ width: 400, height: 200, className: "sigCanvas" }}
        />
      </div>
      <Button 
        type="primary" 
        onClick={handleSubmit} 
        style={{ marginTop: 20 }} 
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spin /> : "Submit Signature"}
      </Button>
    </Card>
  );
};
