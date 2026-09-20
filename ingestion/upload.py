"""
RICH - Document Volume Uploader & Execution Trigger
Uploads PDF/DOCX/MD documents from a local directory to Modal Volume (rich-documents-volume)
and triggers the cloud GPU ingestion pipeline.
"""

import glob
import os
import subprocess
import sys


def upload_to_volume(directory: str = "data/compliance_docs"):
    """Push local documents to the Modal Volume"""
    if not os.path.exists(directory):
        print(f"Directory '{directory}' does not exist. Creating it.")
        os.makedirs(directory, exist_ok=True)
        print(f"Drop your EUDR/GDPR PDFs, DOCX, or MD files into {directory}/ and run again.")
        return False

    files = [f for f in glob.glob(f"{directory}/*.*") if f.lower().endswith((".pdf", ".md", ".docx", ".json"))]

    if not files:
        print(f"No compliance documents found in {directory}/.")
        print(f"Please add regulation PDFs (e.g. EUDR_2023_1115.pdf) to {directory}/")
        return False

    print(f"Uploading {len(files)} document(s) to Modal Volume (rich-documents-volume)...")
    for f in files:
        try:
            print(f"  --> Pushing {f}...")
            subprocess.run(
                ["modal", "volume", "put", "--force", "rich-documents-volume", f, "/"],
                check=True,
            )
        except subprocess.CalledProcessError as e:
            print(f"Failed to push {f} to Volume: {e}")
            return False

    print("Volume upload complete!")
    return True


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Upload documents to Modal Volume and trigger pipeline.")
    parser.add_argument("--dir", default="data/compliance_docs", help="Local directory containing documents")
    parser.add_argument("--force", action="store_true", help="Force re-processing of already processed documents")
    parser.add_argument("--skip-run", action="store_true", help="Upload only without running ingestion")
    args = parser.parse_args()

    if upload_to_volume(directory=args.dir):
        if not args.skip_run:
            print("Launching Modal cloud processing on T4 GPU...")
            cmd = ["modal", "run", "ingestion/modal_embed.py"]
            if args.force:
                cmd.extend(["--force", "true"])
            try:
                subprocess.run(cmd, check=True)
                print("Modal document embedding pipeline successfully finished!")
            except Exception as e:
                print(f"Modal execution failed: {e}")
                sys.exit(1)
